import { useForm } from "react-hook-form"
import { signupSchema, type SignupData } from "../types/signupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Container, Paper, Typography, Link as MuiLink } from "@mui/material"
import { RHFTextField } from "../components/RHFTextField"
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"
import { signup } from "../lib/api"
import type { AxiosError } from "axios"

type SignupErrorResponse = {
  message?: string;
  errors?: {
    email?: string;
    displayName?: string;
  };
};

export const Signup = () => {
    const navigate = useNavigate();
    const {
        control,
        reset,
        handleSubmit
    } = useForm<SignupData>({
        shouldFocusError: true,
        mode: 'all',
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            displayName: "",
            password: "",
            confirmPassword: "",
        },
    })
    const {
        mutate: register,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            reset()
            navigate('/login', {
                replace: true
            })
        }
    })
    const onSubmit = (values: SignupData) => {
        const { confirmPassword, ...payload } = values;
        register(payload)
    }
    return (
        <Box
            display="flex"
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            sx={{
                bgcolor: "gray.light",
                overflowY: "auto",
                py: 4
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h3" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                    Let's Get Started
                </Typography>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Box display="flex" flexDirection="column" gap={3}>
                            <RHFTextField<SignupData>
                                name='firstName'
                                control={control}
                                label='First Name'
                            />
                            <RHFTextField<SignupData>
                                name='lastName'
                                control={control}
                                label='Last Name'
                            />
                            <RHFTextField<SignupData>
                                name='email'
                                control={control}
                                label='Email'
                            />
                            {isError && (
                                <Box>
                                    <Typography color="error" variant="body2" align="center">
                                        {(error as AxiosError<SignupErrorResponse>)?.response?.data?.errors?.email}
                                    </Typography>
                                </Box>
                            )}
                            <RHFTextField<SignupData>
                                name='displayName'
                                control={control}
                                label='Display Name'
                            />
                            {isError && (
                                <Box>
                                    <Typography color="error" variant="body2" align="center">
                                        {(error as AxiosError<SignupErrorResponse>)?.response?.data?.errors?.displayName}
                                    </Typography>
                                </Box>
                            )}
                            <RHFTextField<SignupData>
                                type='password'
                                name='password'
                                control={control}
                                label='Password'
                            />
                            <RHFTextField<SignupData>
                                name='confirmPassword'
                                control={control}
                                label='Confirm Password'
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                disabled={isPending}
                            >
                                Create Accout
                            </Button>
                            <Box textAlign="center" mt={1}>
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <MuiLink component={RouterLink} to="/login" underline="hover" replace>
                                        Login
                                    </MuiLink>
                                </Typography>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}