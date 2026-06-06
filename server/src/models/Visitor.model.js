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
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    ipAddress: String,

    browser: {
      name: String,
      version: String,
    },

    os: {
      name: String,
      version: String,
    },

    device: String,

    pagesVisited: [
      {
        path: String,
        visitedAt: {
          type: String,
          default: () => formatIST(),
        },
      },
    ],

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

    lastSeenTimestamp: {
      type: Number,
      default: Date.now,
    },

    isOnline: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: String,
      default: () => formatIST(),
    },

    updatedAt: {
      type: String,
      default: () => formatIST(),
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('Visitor', visitorSchema);
