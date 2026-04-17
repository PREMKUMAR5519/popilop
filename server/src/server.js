import app from './app.js';
import env from './config/env.js';
import { connectDatabase } from './config/database.js';
import { startSchedulerJob } from './jobs/schedulerJob.js';

const bootstrap = async () => {
  await connectDatabase();
  startSchedulerJob();

  app.listen(env.port, () => {
    console.log(`API server listening on http://localhost:${env.port}`);
  });
};

bootstrap().catch(error => {
  console.error('Failed to start server', error);
  process.exit(1);
});
