const mongoose = require('mongoose');

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

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    browser: {
      name: String,
      version: String,
    },

    os: {
      name: String,
      version: String,
    },

    device: String,

    pagesVisited: [String],

    visitCount: {
      type: Number,
      default: 1,
    },

    firstVisitAt: {
      type: String,
      default: () => formatIST(),
    },

    lastSeenAt: {
      type: String,
      default: () => formatIST(),
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('Visitor', visitorSchema);
