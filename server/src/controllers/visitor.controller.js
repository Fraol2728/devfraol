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
    const { path, newSession } = req.body;

    if (!path) {
      return res.status(400).json({ success: false, message: 'path required' });
    }

    const ipAddress = req.ip; // normalized by Express via trust proxy
    const parser = new UAParser(req.headers['user-agent']);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    const existing = await Visitor.findOne({ ipAddress });

    if (!existing) {
      await Visitor.create({
        ipAddress,
        browser: { name: browser.name, version: browser.version },
        os: { name: os.name, version: os.version },
        device: device.type || 'desktop',
        pagesVisited: [path],
        visitCount: 1,
      });
      return res.json({ success: true });
    }

    const update = {
      lastSeenAt: formatIST(),
      $push: { pagesVisited: { $each: [path], $slice: -100 } },
    };

    if (newSession) {
      update.$inc = { visitCount: 1 };
    }

    await Visitor.findOneAndUpdate({ ipAddress }, update);
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const heartbeat = async (req, res, next) => {
  try {
    const ipAddress = req.ip;
    await Visitor.findOneAndUpdate({ ipAddress }, { lastSeenAt: formatIST() });
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getVisitors = async (req, res, next) => {
  try {
    const visitors = await Visitor.find().sort({ firstVisitAt: -1 }).lean();
    return res.json({ success: true, total: visitors.length, data: visitors });
  } catch (error) {
    next(error);
  }
};

module.exports = { trackVisitor, heartbeat, getVisitors };
