const crypto = require('crypto');

const requireAdminKey = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  const adminKey = process.env.ADMIN_API_KEY;

  if (!key || !adminKey) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const keyBuf = Buffer.from(key);
    const adminBuf = Buffer.from(adminKey);
    if (keyBuf.length !== adminBuf.length || !crypto.timingSafeEqual(keyBuf, adminBuf)) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } catch {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  next();
};

module.exports = { requireAdminKey };
