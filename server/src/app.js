import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passportInstance from './config/passport.js';
import env from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import creatorRoutes from './routes/creatorRoutes.js';
import landingPageRoutes from './routes/landingPageRoutes.js';
import linkRoutes from './routes/linkRoutes.js';
import instagramRoutes from './routes/instagramRoutes.js';
import crmRoutes from './routes/crmRoutes.js';
import schedulerRoutes from './routes/schedulerRoutes.js';
import automationRoutes from './routes/automationRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session — only needed for the OAuth handshake (state param storage).
// After callback, auth is handled via JWT cookies and the session is cleared.
app.use(session({
  secret: env.jwtAccessSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env.nodeEnv === 'production',
    maxAge: 10 * 60 * 1000 // 10 minutes max for OAuth handshake
  }
}));
app.use(passportInstance.initialize());
app.use(passportInstance.session());

app.get('/healthz', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/creators', creatorRoutes);
app.use('/api/landing-pages', landingPageRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/instagram', instagramRoutes);
app.use('/api/crm', crmRoutes);
app.use('/api/scheduler', schedulerRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

