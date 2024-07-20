import * as z from 'zod';

const AuthSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    code: z.optional(z.string()),
});
export default AuthSchema;
