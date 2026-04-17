import { asyncHandler } from '../utils/asyncHandler.js';
import { issueSession, login, logout, refreshSession, signup } from '../services/authService.js';
import User from '../models/User.js';
import env from '../config/env.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: env.nodeEnv === 'production'
};

const attachSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, cookieOptions);
  res.cookie('refreshToken', session.refreshToken, cookieOptions);
};

export const signupController = asyncHandler(async (req, res) => {
  const session = await signup(req.validated.body);
  attachSessionCookies(res, session);
  res.status(201).json({ success: true, ...session });
});

export const loginController = asyncHandler(async (req, res) => {
  const session = await login(req.validated.body);
  attachSessionCookies(res, session);
  res.json({ success: true, ...session });
});

export const refreshController = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body.refreshToken;
  const session = await refreshSession(token);
  attachSessionCookies(res, session);
  res.json({ success: true, ...session });
});

export const logoutController = asyncHandler(async (req, res) => {
  await logout(req.user._id);
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ success: true, message: 'Logged out successfully' });
});

export const meController = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

export const checkUsernameController = asyncHandler(async (req, res) => {
  const username = (req.query.u || '').toLowerCase().trim();
  if (!username || username.length < 3 || !/^[a-z0-9._-]+$/.test(username)) {
    return res.status(400).json({ success: false, message: 'Username must be at least 3 characters (a-z, 0-9, . _ -)' });
  }
  const taken = await User.exists({ username, _id: { $ne: req.user._id } });
  res.json({ success: true, available: !taken });
});

export const googleCallbackController = asyncHandler(async (req, res) => {
  const user = req.user; // set by passport.authenticate('google')
  const session = await issueSession(user);

  attachSessionCookies(res, session);

  // Clear the Passport session — ongoing auth is via JWT cookies, not sessions
  req.logout(() => {});

  const redirect = user.role === 'admin'
    ? '/admin/users'
    : (!user.username ? '/username-setup' : '/app');

  res.redirect(`${env.clientUrl}${redirect}`);
});

export const setUsernameController = asyncHandler(async (req, res) => {
  const username = (req.body.username || '').toLowerCase().trim();
  if (!username || username.length < 3 || !/^[a-z0-9._-]+$/.test(username)) {
    return res.status(400).json({ success: false, message: 'Invalid username. Use 3+ chars: a-z, 0-9, . _ -' });
  }
  const taken = await User.exists({ username, _id: { $ne: req.user._id } });
  if (taken) {
    return res.status(409).json({ success: false, message: 'Username is already taken' });
  }
  const updated = await User.findByIdAndUpdate(
    req.user._id,
    { username, onboardingCompleted: true },
    { new: true, select: '-passwordHash -refreshToken' }
  );
  res.json({ success: true, user: updated });
});
