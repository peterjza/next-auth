'use server'

import * as z from 'zod';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: 'Invalid Fields'}
    }

    const { email, password} = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        console.log(existingUser)
        return {error: 'Email does not exist !'}
    }

    // TODO Inccorect password does get triggered
    if (existingUser.email && !existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email)
        
         await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return {error: 'Confirmation email sent'}
    }

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        
        return {success: ''}

    } catch (error) {
        console.log(error)
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: 'Invalid Credentials'}
                default:
                    return {error: 'Something went wrong'}
            }
        }
        throw error
    }
}