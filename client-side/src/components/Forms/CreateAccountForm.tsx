"use client";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/state/remote/mutations/createUser";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const backendErrors = {
  emailError: "Email already in use.",
  usernameError: "Username already in use.",
};

export default function CreateAccountForm() {
  const [registerUser, { error: gqlError }] = useMutation(createUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, touchedFields, isSubmitted, isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/characters");
    }
  }, [router]);

  const pw = watch("password");
  const confirmPw = watch("confirmPassword");

  useEffect(() => {
    if (touchedFields.confirmPassword) {
      trigger("confirmPassword");
    }

    if (confirmPw.length === pw.length && confirmPw.length > 0) {
      trigger("confirmPassword");
    }

    if (pw && confirmPw) {
      trigger("confirmPassword");
    }
  }, [pw, confirmPw, touchedFields.confirmPassword, trigger]);

  const showConfirmErr =
    !!errors.confirmPassword &&
    (touchedFields.confirmPassword || confirmPw.length > 0 || isSubmitted);

  const onSubmit = async (data: FormValues) => {
    const { email, username, password } = data;
    await registerUser({ variables: { input: { email, username, password } } });
    router.push("/login");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 3,
          backgroundImage: `url('/backgrounds/sorcerer.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: `rgba(255,255,255,0.7)`,
          backgroundBlendMode: "lighten",
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="email"
            error={
              !!errors.email ||
              backendErrors.emailError === gqlError?.graphQLErrors?.[0]?.message
            }
            helperText={errors.email?.message ?? " "}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: "Enter a valid email",
              },
            })}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="username"
            error={
              !!errors.username ||
              backendErrors.usernameError ===
                gqlError?.graphQLErrors?.[0]?.message
            }
            helperText={errors.username?.message ?? " "}
            {...register("username", {
              required: "Username is required",
              minLength: { value: 2, message: "Minimum 2 characters" },
            })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message ?? " "}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
              validate: {
                hasUpper: (v) =>
                  /[A-Z]/.test(v) || "Must include an uppercase letter",
                hasNumber: (v) => /\d/.test(v) || "Must include a number",
              },
            })}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="new-password"
            error={showConfirmErr}
            helperText={showConfirmErr ? errors.confirmPassword?.message : " "}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (v) => v === pw || "Passwords must match",
            })}
          />

          <Typography
            color="error"
            sx={{
              my: 1,
              textAlign: "center",
              minHeight: 24,
              visibility: gqlError ? "visible" : "hidden",
            }}
          >
            {gqlError?.graphQLErrors?.[0]?.message || "Something went wrong"}
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
