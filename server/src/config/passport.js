import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import CreatorProfile from '../models/CreatorProfile.js';
import LandingPage from '../models/LandingPage.js';
import CreatorSetting from '../models/CreatorSetting.js';
import env from './env.js';

// Minimal serialize/deserialize — session is only used during the OAuth handshake,
// not for ongoing authentication (we use JWT cookies for that).
passport.serializeUser((user, done) => done(null, user._id.toString()));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-passwordHash');
    done(null, user);
  } catch (err) {
    done(err);
  }
});

if (env.google.clientId && env.google.clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.google.clientId,
        clientSecret: env.google.clientSecret,
        callbackURL: env.google.callbackUrl,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.toLowerCase();
          const avatar = profile.photos?.[0]?.value;
          const name = profile.displayName || email?.split('@')[0] || 'Creator';

          // 1. Returning Google-linked user
          let user = await User.findOne({ googleId: profile.id });
          if (user) return done(null, user);

          // 2. Existing account with same email → link Google to it
          if (email) {
            user = await User.findOne({ email });
            if (user) {
              user.googleId = profile.id;
              if (!user.avatar && avatar) user.avatar = avatar;
              await user.save();
              return done(null, user);
            }
          }

          // 3. Brand-new user — create user + creator profile
          user = await User.create({
            name,
            email,
            googleId: profile.id,
            avatar,
            role: 'creator'
          });

          // Generate a unique slug from the email prefix
          const slugBase = (email?.split('@')[0] || 'creator')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
            .slice(0, 20) || 'creator';
          let slug = slugBase;
          let n = 1;
          while (await CreatorProfile.exists({ slug })) slug = `${slugBase}${n++}`;

          const creatorProfile = await CreatorProfile.create({
            user: user._id,
            displayName: name,
            slug,
            headline: 'Creator strategist, educator, and digital product seller'
          });
          await LandingPage.create({
            creator: creatorProfile._id,
            title: `${name} | Creator Hub`,
            slug,
            metaTitle: `${name} | Creator Hub`
          });
          await CreatorSetting.create({ creator: creatorProfile._id });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

export default passport;
