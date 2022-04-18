import passport from "passport";
import { Profile, Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import UserMains, { User } from "../schemas/collections/Users/UserMains";

passport.serializeUser((user: User, done) => {
    return done(null, user.userId)
})

passport.deserializeUser(async (id, done) => {
  const user = await UserMains.findOne({ userId: id });
  return user ? done(null, user as User) : done(null, null);
});

export default () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
        scope: ["identify"],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        let userSchema = await UserMains.findOne({ userId: profile.id });
        if (!userSchema) await UserMains.create({ userId: profile.id });
        await UserMains.findOneAndUpdate(
          { userId: profile.id },
          {
            tag: `${profile.username}#${profile.discriminator}`,
            avatar_url: profile.avatar
              ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar.replace("a_", "")}.png?size=128`
              : "https://cdn.discordapp.com/attachments/957399182115745802/965635698952634498/Pastel-Red.png",
          }
        );
        userSchema = await UserMains.findOne({ userId: profile.id });
        done(null, userSchema as User);
      }
    )
  );
}