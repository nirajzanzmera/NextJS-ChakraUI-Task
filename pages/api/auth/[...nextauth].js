import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import EmailProvider from "next-auth/providers/email";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIIMFkOuUv39pKVjvarMY4n1Z1FV18huo",

  authDomain: "access-enable.firebaseapp.com",

  projectId: "access-enable",

  storageBucket: "access-enable.appspot.com",

  messagingSenderId: "772597675240",

  appId: "1:772597675240:web:8524af98ba655fa6d8855d",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export default NextAuth({
  pages: {
    newUser: "/check", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  events: {
    async signIn(message) {
    },
  },
  // adapter: FirebaseAdapter({
  //   db,
  //   collection,
  //   query,
  //   getDocs,
  //   where,
  //   limit,
  //   doc,
  //   getDoc,
  //   addDoc,
  //   updateDoc,
  //   deleteDoc,
  //   runTransaction,
  // }),
  // Configure one or more authentication providers
  providers: [
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // session.user.email = session.user.name
      //   .split(" ")
      //   .join("")
      //   .toLocaleLowerCase();

      session = token;
      return session;
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (user) {
        token = {
          id: user.id,
          provider: account.provider,
          email: user.email,
          image: user?.image,
          name: user?.name,
        };
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  secret: process.env.JWT_SECRET,
});
