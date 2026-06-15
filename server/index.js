require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const REQUIRED_ENV = ['MONGODB_URI', 'FRONTEND_URL'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`[server] Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

start().catch((err) => {
  console.error('[server] failed to start:', err.message);
  process.exit(1);
});
