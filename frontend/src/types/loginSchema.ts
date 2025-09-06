import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be more than 6 characters")
})

export type LoginData = z.infer<typeof loginSchema>;