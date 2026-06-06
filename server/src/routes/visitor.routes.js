const express = require('express');
const { trackVisitor, heartbeat, getVisitors } = require('../controllers/visitor.controller');

const { requireAdminKey } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/track', trackVisitor);

router.post('/heartbeat', heartbeat);

router.get('/', requireAdminKey, getVisitors);

module.exports = router;
