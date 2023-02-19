import { AlternateEmail, GitHub, Person, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Box>
      <CssBaseline />
      <Head>
        <title>Web3 Goals Wrapper Demo App</title>
      </Head>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 8,
        }}
      >
        <Avatar
          sx={{
            width: 164,
            height: 164,
            borderRadius: 164,
          }}
          src="/avatar.png"
        >
          <Person sx={{ fontSize: 64 }} />
        </Avatar>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Arthur Sabirzyanov
        </Typography>
        <Typography textAlign="center" sx={{ maxWidth: 480, mt: 1 }}>
          Let&apos;s Build a Bright Future Together!
        </Typography>
        <Stack direction="row" sx={{ mt: 1.5 }}>
          <IconButton
            href={`mailto:aloha@kiv1n.ru`}
            target="_blank"
            component="a"
            color="primary"
          >
            <AlternateEmail />
          </IconButton>
          <IconButton
            href={`https://github.com/kiv1n`}
            target="_blank"
            component="a"
            color="primary"
          >
            <GitHub />
          </IconButton>
          <IconButton
            href={`https://twitter.com/kiv1n`}
            target="_blank"
            component="a"
            color="primary"
          >
            <Twitter />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
