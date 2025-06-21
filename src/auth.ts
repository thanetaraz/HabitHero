import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signUpSchema } from "@/schema";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signUpSchema.parseAsync(credentials);          
          const user = await db.user.findFirst({
            where: {
              email: email,              
            },
          });
          if (!user || !user.password) {
            throw new Error("Invalid credentials.");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }          
          return {
            id: user.id,
            email: user.email,            
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }        
      },      
    }),
  ],
   callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
});