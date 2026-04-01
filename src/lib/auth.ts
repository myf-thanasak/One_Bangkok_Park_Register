import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const adminUsername = process.env.ADMIN_USERNAME || "admin";
        const adminPassword = process.env.ADMIN_PASSWORD || "changeme123";

        if (credentials.username !== adminUsername) return null;

        const hashedStored = process.env.ADMIN_PASSWORD_HASH;
        let valid = false;

        if (hashedStored) {
          valid = await bcrypt.compare(credentials.password, hashedStored);
        } else {
          valid = credentials.password === adminPassword;
        }

        if (valid) {
          return { id: "1", name: "Admin", email: "admin@waterpark.local" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
