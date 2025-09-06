import { Box, Button, Container, Paper, Typography, Link as MuiLink } from "@mui/material"
import { useForm } from "react-hook-form";
import { loginSchema, type LoginData } from "../types/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFTextField } from "../components/RHFTextField";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setGuest } from "../features/authSlice";
import { useMutation } from "@tanstack/react-query";
import { login } from "../lib/api";
import type { AxiosError } from "axios";


export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {
        control,
        reset,
        handleSubmit
    } = useForm<LoginData>({
        shouldFocusError: true,
        mode: 'all',
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const {
        mutate: signIn,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: login,
        onSuccess: async () => {
            reset()
            navigate('/', {
                replace: true
            })
        }
    })

    const onGuest = async () => {
        dispatch(setGuest())
        navigate("/", { replace: true })
    }

    const onSubmit = (values: LoginData) => {
        signIn(values)
    }

    return (
        <Box
            display="flex"
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            sx={{ bgcolor: "gray.light" }}
        >
            <Container maxWidth="sm">
                <Typography variant="h3" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                    Welcome to Reddix
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
                            <Typography variant="h5" align="center" gutterBottom color="primary" sx={{ fontWeight: '600', marginTop: 1.5 }}>
                                Login
                            </Typography>
                            {isError && (
                                <Box>
                                    <Typography color="error" variant="body2" align="center">
                                        {(error as AxiosError<{ message?: string }>)?.response?.data?.message || "Something went wrong"}
                                    </Typography>
                                </Box>
                            )}
                            <RHFTextField<LoginData>
                                name='email'
                                control={control}
                                label='Email'
                            />
                            <RHFTextField<LoginData>
                                type='password'
                                name='password'
                                control={control}
                                label='Password'
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                disabled={isPending}
                            >
                                Sign in
                            </Button>
                            <Box textAlign="center" mt={1}>
                                <Typography variant="body2" color="text.secondary">
                                    Don&apos;t have an account?{' '}
                                    <MuiLink component={RouterLink} to="/signup" underline="hover" replace>
                                        Sign up
                                    </MuiLink>
                                </Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="body2" color="text.secondary">
                                    <MuiLink component={RouterLink} to="/" underline="hover" onClick={onGuest} replace>
                                        Guest Login
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