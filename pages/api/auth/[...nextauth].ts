import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Prisma client setup

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // If user exists and passwords match, return user data
        if (user && bcrypt.compareSync(credentials?.password || "", user.password)) {
          return {
            id: user.id,
            email: user.email,
            role: user.role, // Pass role along with other user info
          };
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  callbacks: {
    // This callback will be fired during the JWT creation (on login)
    async jwt({ token, user }) {
      // Add the user info to the token when the user logs in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role; // Store role in token
      }
      return token; // Return the token
    },
    
    // This callback will be fired when the session is being checked
    async session({ session, token }) {
      // Attach the token's user info to the session
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role; // Add role from token to session
      return session; // Return the session
    },
  },
  pages: {
    signIn: "/login", // Redirect to the custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret to sign the JWT tokens
});

