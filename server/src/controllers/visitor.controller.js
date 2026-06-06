const UAParser = require('ua-parser-js');
const Visitor = require('../models/Visitor.model');

const formatIST = (date = new Date()) =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date);

const trackVisitor = async (req, res, next) => {
  try {
    const { sessionId, path } = req.body;

    if (!sessionId || !path) {
      return res.status(400).json({
        success: false,
        message: 'sessionId and path required',
      });
    }

    const parser = new UAParser(req.headers['user-agent']);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    const ipAddress =
      req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || req.ip;

    const existing = await Visitor.findOne({ sessionId });

    if (!existing) {
      await Visitor.create({
        sessionId,
        ipAddress,
        browser: {
          name: browser.name,
          version: browser.version,
        },
        os: {
          name: os.name,
          version: os.version,
        },
        device: device.type || 'desktop',
        pagesVisited: [{ path }],
      });

      return res.json({ success: true });
    }

    const now = new Date();

    existing.visitCount += 1;
    existing.lastSeenAt = formatIST(now);
    existing.lastSeenTimestamp = now.getTime();
    existing.updatedAt = formatIST(now);
    existing.isOnline = true;
    existing.pagesVisited.push({ path });

    await existing.save();

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const heartbeat = async (req, res, next) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'sessionId required' });
    }

    const now = new Date();

    await Visitor.findOneAndUpdate(
      { sessionId },
      {
        lastSeenAt: formatIST(now),
        lastSeenTimestamp: now.getTime(),
        updatedAt: formatIST(now),
        isOnline: true,
      },
    );

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getVisitors = async (req, res, next) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 }).lean();

    const now = Date.now();

    const data = visitors.map(({ lastSeenTimestamp, ...rest }) => ({
      ...rest,
      isOnline: now - (lastSeenTimestamp || 0) < 60000,
    }));

    return res.json({ success: true, total: data.length, data });
  } catch (error) {
    next(error);
  }
};

module.exports = { trackVisitor, heartbeat, getVisitors };
