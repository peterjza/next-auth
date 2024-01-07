
import bcryptjs from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin";
import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "./data/user"

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      // clientId: process.env.LINKEDIN_CLIENT_ID, 
      // clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      //   authorization: { params: { scope: 'profile email openid' } },
      //   issuer: 'https://www.linkedin.com',
      //   jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      //   async profile(profile) {
      //     return {
      //       id: profile.sub,
      //       name: profile.name,
      //       firstname: profile.given_name,
      //       lastname: profile.family_name,
      //       email: profile.email
      //     }
      //   },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        console.log('HERE - Credentials')

        if (validatedFields.success) {
          const {email, password} = validatedFields.data

          const user = await getUserByEmail(email)

          if (!user || !user.password) return null

          const passwordMatch = await bcryptjs.compare(
            password,
            user.password
          )

          if (passwordMatch){
             return user
          }

        }
        return null
      }
    })
  ],
} satisfies NextAuthConfig