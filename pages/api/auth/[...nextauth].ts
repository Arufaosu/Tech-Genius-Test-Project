import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Add more providers as needed
  ],
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
  },
  database: process.env.DATABASE_URL,
});
