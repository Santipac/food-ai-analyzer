interface SecurityCheckResult {
  allowed: boolean;
  reason?: string;
}

export class SecurityMiddleware {
  private static readonly MAX_REQUEST_SIZE = 50 * 1024; // 50KB max request size
  private static readonly MAX_MESSAGE_LENGTH = 2000; // Max characters per message
  private static readonly MAX_MESSAGES = 50; // Max messages in conversation
  
  // Common patterns that might indicate malicious content
  private static readonly SUSPICIOUS_PATTERNS = [
    /ignore\s+previous\s+instructions/i,
    /forget\s+everything/i,
    /system\s*[:=]\s*["'].*["']/i,
    /role\s*[:=]\s*["'].*["']/i,
    /<script[^>]*>/i,
    /javascript:/i,
    /data:text\/html/i,
    /eval\s*\(/i,
    /prompt\s*injection/i,
    /jailbreak/i,
    /(curl|wget|fetch)\s+http/i,
    /base64/i,
    /\$\{.*\}/g, // Template literal injection
  ];

  // Rate limiting for specific suspicious patterns
  private static suspiciousAttempts = new Map<string, number>();

  static validateRequestSize(req: Request): SecurityCheckResult {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > this.MAX_REQUEST_SIZE) {
      return {
        allowed: false,
        reason: 'Request too large'
      };
    }
    return { allowed: true };
  }

  static validateContentType(req: Request): SecurityCheckResult {
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {
        allowed: false,
        reason: 'Invalid content type'
      };
    }
    return { allowed: true };
  }

  static async validateRequestBody(req: Request): Promise<SecurityCheckResult> {
    try {
      const body = await req.text();
      
      // Check for suspicious patterns
      for (const pattern of this.SUSPICIOUS_PATTERNS) {
        if (pattern.test(body)) {
          this.incrementSuspiciousAttempts(req);
          return {
            allowed: false,
            reason: 'Suspicious content detected'
          };
        }
      }

      // Parse and validate JSON structure
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        return {
          allowed: false,
          reason: 'Invalid JSON'
        };
      }

      // Validate message structure for chat/nutrition endpoints
      if (parsed.messages && Array.isArray(parsed.messages)) {
        if (parsed.messages.length > this.MAX_MESSAGES) {
          return {
            allowed: false,
            reason: 'Too many messages'
          };
        }

        for (const message of parsed.messages) {
          if (typeof message.content === 'string' && message.content.length > this.MAX_MESSAGE_LENGTH) {
            return {
              allowed: false,
              reason: 'Message too long'
            };
          }

          // Check each message for suspicious patterns
          if (typeof message.content === 'string') {
            for (const pattern of this.SUSPICIOUS_PATTERNS) {
              if (pattern.test(message.content)) {
                this.incrementSuspiciousAttempts(req);
                return {
                  allowed: false,
                  reason: 'Suspicious message content'
                };
              }
            }
          }
        }
      }

      return { allowed: true };
    } catch (error) {
      return {
        allowed: false,
        reason: 'Failed to validate request'
      };
    }
  }

  static checkSuspiciousAttempts(req: Request): SecurityCheckResult {
    const clientId = this.getClientId(req);
    const attempts = this.suspiciousAttempts.get(clientId) || 0;
    
    if (attempts >= 3) {
      return {
        allowed: false,
        reason: 'Too many suspicious attempts'
      };
    }
    
    return { allowed: true };
  }

  private static incrementSuspiciousAttempts(req: Request) {
    const clientId = this.getClientId(req);
    const current = this.suspiciousAttempts.get(clientId) || 0;
    this.suspiciousAttempts.set(clientId, current + 1);
    
    // Clean up after 1 hour
    setTimeout(() => {
      this.suspiciousAttempts.delete(clientId);
    }, 3600000);
  }

  private static getClientId(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    return forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
  }

  static createSecurityResponse(reason: string) {
    return new Response(
      JSON.stringify({
        error: 'Request blocked',
        message: 'Your request was blocked for security reasons.',
        code: 'SECURITY_VIOLATION'
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // Main validation function that combines all checks
  static async validateRequest(req: Request): Promise<SecurityCheckResult> {
    // Basic checks
    const sizeCheck = this.validateRequestSize(req);
    if (!sizeCheck.allowed) return sizeCheck;

    const contentTypeCheck = this.validateContentType(req);
    if (!contentTypeCheck.allowed) return contentTypeCheck;

    const suspiciousCheck = this.checkSuspiciousAttempts(req);
    if (!suspiciousCheck.allowed) return suspiciousCheck;

    // Body validation (this consumes the request body)
    const bodyCheck = await this.validateRequestBody(req);
    if (!bodyCheck.allowed) return bodyCheck;

    return { allowed: true };
  }
} 