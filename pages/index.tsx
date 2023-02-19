import {
  AlternateEmail,
  GitHub,
  InsertEmoticon,
  Twitter,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { PolywrapClient } from "@polywrap/client-js";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Person() {
  const avatarLink = "/avatar.png";
  const name = "Arthur Sabirzyanov";
  const bio = "Let's Build a Bright Future Together!";
  const email = "aloha@kiv1n.ru";
  const gitHubUsername = "kiv1n";
  const twitterUsername = "kiv1n";
  const account = "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1";
  const wrapperUri = "ipfs/QmTZW8p41F5GPfueFv6brFDEiU7uf21oBKvuZ4LukHfPvc";
  const wrapperSubgraphAuthor = "kiv1n";
  const wrapperSubgraphName = "web3-goals";
  const wrapperGitHubLink = "https://github.com/web3goals/wrapper";

  const [accountData, setAccountData] = useState<any>();
  const [accountGoals, setAccountGoals] = useState<any>();

  async function loadAccountData() {
    try {
      const client = new PolywrapClient();
      const response = await client.invoke<string>({
        uri: wrapperUri,
        method: "getAccountData",
        args: {
          subgraphAuthor: wrapperSubgraphAuthor,
          subgraphName: wrapperSubgraphName,
          account: account,
        },
      });
      if (response.ok) {
        setAccountData(JSON.parse(response.value).account);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loadAccountGoals() {
    try {
      const client = new PolywrapClient();
      const response = await client.invoke<string>({
        uri: wrapperUri,
        method: "getAccountGoals",
        args: {
          subgraphAuthor: wrapperSubgraphAuthor,
          subgraphName: wrapperSubgraphName,
          account: account,
        },
      });
      if (response.ok) {
        const goals = JSON.parse(response.value).goals;
        for (const goal of goals) {
          const goalUriData = await axios.get(
            goal.uri.replace("ipfs://", "https://w3s.link/ipfs/")
          );
          goal.title = goalUriData.data.description;
        }
        const goalsReversed = goals.reverse();
        setAccountGoals(goalsReversed);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAccountData();
    loadAccountGoals();
  }, []);

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
        {/* Avatar */}
        <Avatar
          sx={{
            width: 164,
            height: 164,
            borderRadius: 164,
          }}
          src={avatarLink}
        >
          <InsertEmoticon sx={{ fontSize: 64 }} />
        </Avatar>
        {/* Name */}
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mt: 2 }}
        >
          {name}
        </Typography>
        {/* Bio */}
        <Typography textAlign="center" sx={{ maxWidth: 480, mt: 1 }}>
          {bio}
        </Typography>
        {/* Links */}
        <Stack direction="row" alignItems="center" sx={{ mt: 1.5 }}>
          <IconButton
            href={`mailto:${email}`}
            target="_blank"
            component="a"
            color="primary"
          >
            <AlternateEmail />
          </IconButton>
          <IconButton
            href={`https://github.com/${gitHubUsername}`}
            target="_blank"
            component="a"
            color="primary"
          >
            <GitHub />
          </IconButton>
          <IconButton
            href={`https://twitter.com/${twitterUsername}`}
            target="_blank"
            component="a"
            color="primary"
          >
            <Twitter />
          </IconButton>
          <MuiLink
            href={`https://web3goals.space/accounts/${account}`}
            target="_blank"
            underline="none"
            sx={{ pl: 1 }}
          >
            🔗 Web3 Goals
          </MuiLink>
          <MuiLink
            href={`https://etherscan.io/address/${account}`}
            target="_blank"
            underline="none"
            sx={{ pl: 1 }}
          >
            🔗 {account.substring(0, 6)}
            ...
            {account.substring(account.length - 4)}
          </MuiLink>
        </Stack>
        {/* Account data */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid",
            borderColor: "divider",
            borderWidth: 6,
            borderRadius: 2,
            py: 2,
            px: 4,
            mt: 6,
            width: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Web3 Goals Account Data
          </Typography>
          <Typography variant="caption">
            Data provided by{" "}
            <MuiLink href={wrapperGitHubLink} target="_blank" underline="none">
              Polywrap wrapper
            </MuiLink>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            {accountData ? (
              <>
                <Typography gutterBottom>
                  ✅ Achieved goals - {accountData.achievedGoals}
                </Typography>
                <Typography gutterBottom>
                  ❌ Failed goals - {accountData.failedGoals}
                </Typography>
                <Typography gutterBottom>
                  🧡 Motivated goals - {accountData.motivatedGoals}
                </Typography>
              </>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        </Box>
        {/* Account goals */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid",
            borderColor: "divider",
            borderWidth: 6,
            borderRadius: 2,
            py: 2,
            px: 4,
            mt: 6,
            width: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Web3 Goals Account Goals
          </Typography>
          <Typography variant="caption">
            Data provided by{" "}
            <MuiLink href={wrapperGitHubLink} target="_blank" underline="none">
              Polywrap wrapper
            </MuiLink>
          </Typography>
          <Box sx={{ mt: 2 }}>
            {accountGoals ? (
              <Stack spacing={2}>
                {accountGoals.map((goal: any, index: any) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <MuiLink
                      href={`https://web3goals.space/goals/${goal.id}`}
                      target="_blank"
                      underline="none"
                    >
                      {goal.title}
                    </MuiLink>
                    <Typography
                      variant="caption"
                      textAlign="center"
                      sx={{ mt: 0.3 }}
                    >
                      {goal.isClosed
                        ? goal.isAchieved
                          ? "✅ Achieved"
                          : "❌ Failed"
                        : "⌛ In Progress"}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
