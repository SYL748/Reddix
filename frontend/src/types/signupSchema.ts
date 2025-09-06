import z from "zod";

export const signupSchema = z.object({
    firstName: z.string().min(1, "Can't be empty"),
    lastName: z.string().min(1, "Can't be empty"),
    email: z.string().email("Enter a valid email address"),
    displayName: z.string().min(1, "Can't be empty"),
    password: z.string().min(6, "Password must be more than 6 characters"),
    confirmPassword: z.string()
}).superRefine((formData, ctx) => {
    if (formData.password !== formData.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: "custom",
            message: "Passwords do not match",
        });
    }

    const pwd = formData.password.toLowerCase();
    const emailLocalPart = formData.email.split("@")[0]?.toLowerCase();

    if (pwd.includes(formData.firstName.toLowerCase())) {
        ctx.addIssue({
            path: ["password"],
            code: "custom",
            message: "Password cannot contain your first name.",
        });
    }
    if (pwd.includes(formData.lastName.toLowerCase())) {
        ctx.addIssue({
            path: ["password"],
            code: "custom",
            message: "Password cannot contain your last name.",
        });
    }
    if (pwd.includes(formData.displayName.toLowerCase())) {
        ctx.addIssue({
            path: ["password"],
            code: "custom",
            message: "Password cannot contain your display name.",
        });
    }
    if (pwd.includes(formData.email.toLowerCase())) {
        ctx.addIssue({
            path: ["password"],
            code: "custom",
            message: "Password cannot contain your email.",
        });
    }
    if (emailLocalPart && pwd.includes(emailLocalPart)) {
        ctx.addIssue({
            path: ["password"],
            code: "custom",
            message: "Password cannot contain the local part of your email.",
        });
    }
});

export type SignupData = z.infer<typeof signupSchema>