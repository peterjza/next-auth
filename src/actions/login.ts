'use server'

import * as z from 'zod';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: 'Invalid Fields'}
    }

    const { email, password} = validatedFields.data

    const exisitingUser = await getUserByEmail(email)

    if (!exisitingUser || !exisitingUser.email || !exisitingUser.password) {
        return {error: 'Email does not exist'}
    }

    // TODO Inccorect password does get triggered
    if (!exisitingUser.emailVerified) {
        const verificationToken = generateVerificationToken(exisitingUser.email)
        
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