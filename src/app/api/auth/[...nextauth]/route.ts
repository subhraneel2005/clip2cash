import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { getServerSession } from 'next-auth';

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
      const session = await getServerSession(authOptions);
      
      if (session?.user?.email) {
        const mailOptions = {
          from: process.env.FROM_EMAIL,
          to: session.user.email,
          subject: 'Welcome to GetStart!',
          html: `
              <p>Hello ${session.user.name || 'User'}, welcome to GetStart! We're glad to have you 😄.</p>
              <p>To get started, please visit our <a href="https://github.com/Subhamay-Dey" target="_blank">GetStart Page</a>.</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } else {
        console.error("User email is missing. Cannot send welcome email.");
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
