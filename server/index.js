require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

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
