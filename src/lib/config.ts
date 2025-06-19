export const CONFIG = {
  // Rate Limiting Configuration
  RATE_LIMITS: {
    CHAT: {
      WINDOW_MS: parseInt(process.env.CHAT_RATE_WINDOW_MS || '60000'), // 1 minute
      MAX_REQUESTS: parseInt(process.env.CHAT_MAX_REQUESTS || '20'),   // 20 requests per minute
    },
    NUTRITION: {
      WINDOW_MS: parseInt(process.env.NUTRITION_RATE_WINDOW_MS || '60000'), // 1 minute  
      MAX_REQUESTS: parseInt(process.env.NUTRITION_MAX_REQUESTS || '10'),   // 10 requests per minute
    },
    GLOBAL: {
      WINDOW_MS: parseInt(process.env.GLOBAL_RATE_WINDOW_MS || '300000'), // 5 minutes
      MAX_REQUESTS: parseInt(process.env.GLOBAL_MAX_REQUESTS || '100'),   // 100 requests per 5 minutes
    }
  },
  
  // Security Configuration
  SECURITY: {
    MAX_REQUEST_SIZE: parseInt(process.env.MAX_REQUEST_SIZE || '51200'),    // 50KB
    MAX_MESSAGE_LENGTH: parseInt(process.env.MAX_MESSAGE_LENGTH || '2000'), // 2000 characters
    MAX_MESSAGES: parseInt(process.env.MAX_MESSAGES || '50'),               // 50 messages
    MAX_SUSPICIOUS_ATTEMPTS: parseInt(process.env.MAX_SUSPICIOUS_ATTEMPTS || '3'), // 3 attempts
  },

  // Feature Flags
  FEATURES: {
    ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING !== 'false',
    ENABLE_SECURITY_MIDDLEWARE: process.env.ENABLE_SECURITY_MIDDLEWARE !== 'false',
    ENABLE_REQUEST_LOGGING: process.env.ENABLE_REQUEST_LOGGING === 'true',
  },

  // Environment
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const; 