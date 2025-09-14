import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import SavingThrowCard from "./SavingThrowCard";

import { AbilityScores, calculateModifier, calculateProficiency } from "@/utils/helpers";
import {
  AbilityScoresQueryKeysType,
  AbilityScoresQueryType,
} from "@/utils/types";

const SavingThrowsDashboard = ({
  abilityScores,
  savingThrows,
  level
}: {
  abilityScores: AbilityScoresQueryType;
  savingThrows: string[];
  level: number
}) => {
  const savingThrowsSet = new Set(savingThrows);

  return (
    <Box
      width="100%"
      height={{ xs: "30%", md: "26%" }}
      border={2}
      borderColor="purple"
      borderRadius={5}
      mt={1}
      bgcolor="#e1e1e1"
      sx={{
        backgroundColor: `rgba(255,255,255,0.5)`,
        backgroundBlendMode: "lighten",
        zoom: 1,
        "@media (min-width:1700px) and (min-height:950px)": {
          zoom: 1.3,
        },
        "@media (min-width:2050px) and (min-height:1270px)": {
          zoom: 1.7,
        },
      }}
    >
      <Typography textAlign="center" fontWeight={700} mt={0.5}>
        SAVING THROWS
      </Typography>
      <Grid container rowGap={1} columnGap={2} justifyContent="center">
        {Object.keys(AbilityScores).map((abilityScore) => {
          const { modifier, sign } = calculateModifier(
            abilityScores[
              abilityScore.toLowerCase() as AbilityScoresQueryKeysType
            ]
          );
          return (
            <SavingThrowCard
              key={abilityScore}
              name={abilityScore.substring(0, 3)}
              modifier={
                sign +
                (modifier +
                  (savingThrowsSet.has(abilityScore.toLocaleLowerCase())
                    ? calculateProficiency(level)
                    : 0))
              }
              proficient={savingThrowsSet.has(abilityScore.toLocaleLowerCase())}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default SavingThrowsDashboard;
