import { Stack } from "@mui/material";
import React from "react";
import HealthBoard from "@/components/CharacterSheet/HealthAndBattle/HealthBoard";
import BattleBoard from "./BattleBoard";

const HealthAndBattleDashboard = () => {
  return (
    <Stack
      width={365}
      height={320}
      border={1}
      m={1}
      borderRadius={3}
      justifyContent="center"
      alignItems='center'
    >
      <HealthBoard />
      <BattleBoard armor={16} speed={30} initiative={5} />
    </Stack>
  );
};

export default HealthAndBattleDashboard;
