import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this logic with your database check
        const user = { id: 1, name: "Admin", email: "admin@example.com" }
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login'  // Custom login page
  },
})

