const express = require('express');
const { trackVisitor, heartbeat, getVisitors } = require('../controllers/visitor.controller');
const { requireAdminKey } = require('../middleware/auth.middleware');
const { visitorTrackLimiter, heartbeatLimiter } = require('../middleware/rateLimiter.middleware');

const router = express.Router();

router.post('/track', visitorTrackLimiter, trackVisitor);
router.post('/heartbeat', heartbeatLimiter, heartbeat);
router.get('/', requireAdminKey, getVisitors);

module.exports = router;
