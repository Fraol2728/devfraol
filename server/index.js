require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

let dbConnected = false;

const ensureDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

// Vercel serverless handler
module.exports = async (req, res) => {
  await ensureDB();
  return app(req, res);
};

// Local development
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  ensureDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`[server] running on port ${PORT} in ${process.env.NODE_ENV} mode`);
      });
    })
    .catch((err) => {
      console.error('[server] failed to start:', err.message);
      process.exit(1);
    });
}
