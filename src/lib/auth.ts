import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers,signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("Authorize received:", credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log("Authorize failed: Missing credentials");
          return null;
        }
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "password123"
        ) {
          console.log("Authorize success");
          return { id: "1", name: "Test User", email: "test@example.com", image: "/data/avt.jpg" };
        }
        console.log("Authorize failed: Invalid credentials");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});