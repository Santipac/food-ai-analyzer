import { CONFIG } from './config';

interface RateLimitStore {
  count: number;
  resetTime: number;
}

class InMemoryRateLimiter {
  private store = new Map<string, RateLimitStore>();
  private windowSizeMs: number;
  private maxRequests: number;

  constructor(windowSizeMs: number = 60000, maxRequests: number = 10) {
    this.windowSizeMs = windowSizeMs;
    this.maxRequests = maxRequests;
    
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 300000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, data] of this.store.entries()) {
      if (now > data.resetTime) {
        this.store.delete(key);
      }
    }
  }

  private getClientId(req: Request): string {
    // Try to get IP from various headers (for when behind proxy)
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const cfConnectingIp = req.headers.get('cf-connecting-ip');
    
    // Extract first IP if multiple are present
    const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
    
    // Add user agent as additional identifier to make it harder to bypass
    const userAgent = req.headers.get('user-agent') || 'unknown';
    
    return `${ip}-${userAgent.slice(0, 50)}`; // Limit UA length to avoid huge keys
  }

  checkLimit(req: Request): { allowed: boolean; remaining: number; resetTime: number } {
    const clientId = this.getClientId(req);
    const now = Date.now();
    
    let rateLimitData = this.store.get(clientId);

    // If no data exists or window has expired, create new entry
    if (!rateLimitData || now > rateLimitData.resetTime) {
      rateLimitData = {
        count: 1,
        resetTime: now + this.windowSizeMs
      };
      this.store.set(clientId, rateLimitData);
      
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime: rateLimitData.resetTime
      };
    }

    // Increment counter
    rateLimitData.count++;

    // Check if limit exceeded
    if (rateLimitData.count > this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: rateLimitData.resetTime
      };
    }

    return {
      allowed: true,
      remaining: this.maxRequests - rateLimitData.count,
      resetTime: rateLimitData.resetTime
    };
  }
  }

// Create rate limiter instances for different endpoints
export const chatRateLimiter = new InMemoryRateLimiter(
  CONFIG.RATE_LIMITS.CHAT.WINDOW_MS, 
  CONFIG.RATE_LIMITS.CHAT.MAX_REQUESTS
);

export const nutritionRateLimiter = new InMemoryRateLimiter(
  CONFIG.RATE_LIMITS.NUTRITION.WINDOW_MS, 
  CONFIG.RATE_LIMITS.NUTRITION.MAX_REQUESTS
);

export const globalRateLimiter = new InMemoryRateLimiter(
  CONFIG.RATE_LIMITS.GLOBAL.WINDOW_MS, 
  CONFIG.RATE_LIMITS.GLOBAL.MAX_REQUESTS
);

export function createRateLimitResponse(resetTime: number) {
  const waitTime = Math.ceil((resetTime - Date.now()) / 1000);
  
  return new Response(
    JSON.stringify({
      error: 'Rate limit exceeded',
      message: `Too many requests. Try again in ${waitTime} seconds.`,
      retryAfter: waitTime
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': waitTime.toString(),
        'X-RateLimit-Reset': new Date(resetTime).toISOString()
      }
    }
  );
} 