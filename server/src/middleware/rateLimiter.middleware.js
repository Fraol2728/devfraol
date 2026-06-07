const rateLimit = require('express-rate-limit');

const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many submissions. Please wait 15 minutes and try again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
});

const githubRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 120,
  message: { success: false, message: 'Rate limit exceeded.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

const visitorTrackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many tracking requests.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
});

const heartbeatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many heartbeat requests.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
});

module.exports = {
  contactRateLimiter,
  githubRateLimiter,
  globalRateLimiter,
  visitorTrackLimiter,
  heartbeatLimiter,
};
