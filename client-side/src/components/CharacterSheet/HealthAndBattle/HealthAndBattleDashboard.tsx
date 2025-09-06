import { Stack } from "@mui/material";
import React from "react";
import HealthBoard from "@/components/CharacterSheet/HealthAndBattle/HealthBoard";
import BattleBoard from "./BattleBoard";
import { CharacterType } from "@/utils/types";
import { calculateProficiency } from "@/utils/helpers";

type HealthAndBattleDashboardType = {
  character: CharacterType;
  initiative: number;
};

const HealthAndBattleDashboard = ({
  character,
  initiative,
}: HealthAndBattleDashboardType) => {
  return (
    <Stack
      width="100%"
      height={{ xs: 370, md: 280, lg: "50%" }}
      border={2}
      borderColor="purple"
      bgcolor="#e1e1e1"
      borderRadius={3}
      alignItems="center"
      sx={{
        backgroundImage: `url('/backgrounds/two-dragons.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
      <HealthBoard character={character} />
      <BattleBoard
        proficiency={calculateProficiency(character.level) ?? 2}
        armor={character.armor ?? 10}
        speed={character.speed ?? 0}
        initiative={initiative}
      />
    </Stack>
  );
};

export default HealthAndBattleDashboard;
