"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  CardMedia,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { getAllCharactersQuery } from "@/state/remote/queries/getAllCharacters";
import AddIcon from "@mui/icons-material/Add";
import { Character } from "@/state/remote/__generated__/types";
import { useRouter } from "next/navigation";
import CharacterCreationDialog from "../Dialogs/CharacterCreation/DialogForm";
import { CLASSES } from "@/utils/helpers";
import { almendra } from "@/fonts/fonts";

const CardGrid = () => {
  const { data, loading, error } = useQuery(getAllCharactersQuery);
  const [characterCreationOpen, setCharacterCreationOpen] = useState(false);

  const router = useRouter();

  const handleRedirect = (id: number) => {
    router.push(`/characters/${id}`);
  };

  if (loading || error) return;
  if (!data) return;

  return (
    <Box minHeight="80vh" width="70%" mt={10} mx="auto">
      <Stack>
        <Typography
          variant="h1"
          textAlign="center"
          mt={1}
          mb={5}
          className={almendra.className}
        >
          Choose Your Character
        </Typography>
        <Grid container rowGap={8} sx={{ mx: "auto" }} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} justifyItems="center">
            <Card
              onClick={() => setCharacterCreationOpen(true)}
              elevation={5}
              sx={{
                width: 300,
                height: 400,
                borderRadius: 3,
                bgcolor: "#cae6ef",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.03)",
                  cursor: "pointer",
                },
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <AddIcon
                    sx={{
                      fontSize: 180,
                      textAlign: "center",
                      color: "#444444",
                    }}
                  />
                  <Typography>(Click here to add a new character)</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {data.characters.map((character: Character, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index} justifyItems="center">
              <Card
                elevation={5}
                sx={{
                  width: 300,
                  height: 400,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #ede7f6, #d1c4e9)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleRedirect(character.id as number)}
              >
                <CardMedia
                  sx={{
                    height: 160,
                    objectPosition: "top",
                  }}
                  image={
                    CLASSES.has(character.class)
                      ? `/backgrounds/${character.class
                          .toLowerCase()
                          .replace(/ /g, "-")}.png`
                      : `/backgrounds/default1.png`
                  }
                  title="character-background"
                  component="img"
                />
                <CardActionArea
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <CardHeader
                    title={
                      <span className={almendra.className}>
                        {character.name}
                      </span>
                    }
                    subheader={`Level: ${character.level}`}
                    className={almendra.className}
                    titleTypographyProps={{ fontSize: 50 }}
                    subheaderTypographyProps={{ fontSize: 24 }}
                  />

                  <CardContent>
                    <Typography variant="body2" fontSize={20}>
                      {character.subrace} {character.race}{" "}
                    </Typography>
                    <Typography variant="body2" fontSize={20} mt={1}>
                      {" "}
                      {character.subclass} {character.class}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <CharacterCreationDialog
          isOpen={characterCreationOpen}
          setIsOpen={setCharacterCreationOpen}
        />
      </Stack>
    </Box>
  );
};

export default CardGrid;
