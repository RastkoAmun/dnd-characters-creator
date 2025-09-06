"use client";
import { loginQuery } from "@/state/remote/mutations/login";
import { useMutation } from "@apollo/client";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import client from "@/state/remote/apolloClient";
import { useEffect } from "react";

export default function GetStartedForm() {
  const router = useRouter();
  const [login] = useMutation(loginQuery);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/characters");
    }
  }, [router]);

  const handleGuestUser = async () => {
    const form = { username: "Guest", password: "guest-account-123" };
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
        <Typography variant="h5" mb={3}>
          Get Started
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => router.push("/register")}
            sx={{ bgcolor: "white" }}
          >
            Create Account
          </Button>
        </Box>

        <Box my={4} display="flex" alignItems="center">
          <Divider sx={{ flexGrow: 1 }} />
          <Typography sx={{ mx: 2, color: "gray" }}>OR</Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleGuestUser}
          sx={{ bgcolor: "white" }}
        >
          Try Demo Account
        </Button>
      </Paper>
    </Box>
  );
}
