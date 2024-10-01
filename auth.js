import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { User } from "./lib/model";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

const login = async (credentials) => {
  try {
    await connectDB();
    const user = await User.findOne({ email: credentials.email });

    if (!user) throw new Error("Email not found.");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isPasswordCorrect) throw new Error("Incorrect password.");

    return user;
  } catch (err) {
    console.error("Login Error:", err);
    throw new Error("Failed to login!");
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          console.error("Authorization Error:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Store user info in the token (JWT) when user is available
      if (user) {
        token.id = user.id || user._id;
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.isAdmin = user.isAdmin; // Assuming you store this in the database
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token information into session object
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.isAdmin = token.isAdmin; // Make isAdmin accessible in session
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
