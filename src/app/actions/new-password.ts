'use server'

import * as z from 'zod'
import bcryptjs from 'bcryptjs'
import { NewPasswordScheme } from '@/schemas'
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'

export const newPassword = async (values: z.infer<typeof NewPasswordScheme>, token?: string | null) => {
   
    if (!token) {
    return {error: "Missing token!"}
   }

    const validatedFields = NewPasswordScheme.safeParse(values)

    if (!validatedFields.success){
        return {error: 'Invalid fields!'}
    }

    const { password } = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(token)

    if (!existingToken) {
        console
        return {error: 'Invalid Token'}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired){
        return {error: 'Token has expired'}
    }

   const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser){
        return {error: 'Email does not exist'}
    }

    const hashPassword = await bcryptjs.hash(password, 10)

    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashPassword}
    })


    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    })

    return {success: 'Password updated'}
}
