import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { fauna } from "../../../services/fauna";
import { query as q } from "faunadb";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],
  callbacks: {
    //callbacks are called when a user performs a auth action
    async session(session) {
      const userActiveSubscription = await fauna.query(
        q.Get(
          q.Match(
            q.Index("subscription_by_user_ref"),
            q.Select(
              "ref",
              q.Get(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(session.user.email)
                )
              )
            )
          )
        )
      );
      return session;
    },
    async signIn(user, account, profile) {
      const { email } = user;
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("users_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("users_by_email"), q.Casefold(email)))
          )
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
