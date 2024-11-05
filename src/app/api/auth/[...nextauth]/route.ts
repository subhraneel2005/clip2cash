import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  events: {
    async signIn({ user }) {
      // Log the user object to check if email is present
      console.log("SignIn event triggered. User object:", user);

      if (user?.email) {
        const mailOptions = {
          from: process.env.FROM_EMAIL,
          to: user.email,
          subject: 'Welcome to GetStart!',
          text: `Hello ${user.name || 'User'}, welcome to GetStart! We're glad to have you 😄.`
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log("Welcome email sent successfully.");
        } catch (error) {
          console.error("Error sending welcome email:", error);
        }
      } else {
        console.error("User email is missing or null. Cannot send welcome email.");
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
