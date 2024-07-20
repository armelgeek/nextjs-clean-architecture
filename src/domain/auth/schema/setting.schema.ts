import {z} from "zod";
import {UserRole} from "@prisma/client";

export const SettingsSchema = z
    .object({
        name: z.optional(z.string()),
        isTwoFactorEnabled: z.optional(z.boolean()),
        role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
        email: z.optional(z.string().email()),
        password: z.optional(z.string().min(6)),
        newPassword: z.optional(z.string().min(6)),
    })
    .refine(
        (data) => {
            return !(data.password && !data.newPassword);


        },
        {
            message: 'New password is required',
            path: ['newPassword'],
        }
    )
    .refine(
        (data) => {
            return !(data.newPassword && !data.password);


        },
        {
            message: 'Password is required',
            path: ['password'],
        }
    );
