"use client";
import { loginQuery } from "@/state/remote/mutations/login";
import { FormEventType } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import client from "@/state/remote/apolloClient";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(loginQuery);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/characters");
    }
  }, [router]);

  const handleLogin = async (event: FormEventType) => {
    event.preventDefault();
    const { data } = await login({ variables: { input: form } });

    localStorage.setItem("token", data.login.token);
    localStorage.setItem("username", data.login.username);
    await client.resetStore();
    router.push("/characters");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundSize: "1920px 850px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 3,
          backgroundImage: `url('/backgrounds/two-dragons.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: `rgba(255,255,255,0.8)`,
          backgroundBlendMode: "lighten",
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && (
            <Typography color="error" my={1} sx={{ my: 1, textAlign: 'center' }}>
              {error.graphQLErrors[0]?.message || "Something went wrong"}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
