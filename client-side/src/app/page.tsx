"use client";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import HealthAndBattleDashboard from "@/components/CharacterSheet/HealthAndBattle/HealthAndBattleDashboard";
import HealthBoard from "@/components/CharacterSheet/HealthAndBattle/HealthBoard";
import Test from "@/components/Test";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      {/* <Test />
      <AbilityScoresDashboard /> */}
      <HealthAndBattleDashboard />
    </>
  );
}
