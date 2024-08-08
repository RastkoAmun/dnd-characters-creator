import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const labels = {
  armor: "ARMOR",
  speed: "SPEED",
  initiative: "INITIATIVE",
};

type BattleBoardTypes = {
  armor: number;
  speed: number;
  initiative: number;
};

const BattleBoard = ({ armor, speed, initiative }: BattleBoardTypes) => {
  return (
    <Box width={340} height={100} m={2}>
      <Stack
        direction="row"
        m={1}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <Stack justifyContent="center" alignItems="center">
          <Typography>{labels.armor}</Typography>
          <Box
            width={50}
            height={60}
            border={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ borderBottomLeftRadius: 75, borderBottomRightRadius: 75 }}
          >
            <Typography fontSize={24} textAlign="center" mb={1}>
              {armor}
            </Typography>
          </Box>
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Typography>{labels.speed}</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={60}
            height={40}
            border={1}
            borderRadius={1}
          >
            <Typography fontSize={19}>{speed} ft.</Typography>
          </Box>
        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Typography>{labels.initiative}</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={50}
            height={50}
            border={1}
            borderRadius={10}
          >
            <Typography fontSize={24}>+{initiative}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BattleBoard;
