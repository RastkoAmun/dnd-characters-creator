"use client";
import AbilityScoresDashboard from "@/components/CharacterSheet/AbilityScores/AbilityScoresDashboard";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getCharacterQuery } from "@/state/remote/queries/getCharacter";
import getAbilityScores from "@/state/remote/queries/getAbilityScores";
import SavingThrowsDashboard from "@/components/CharacterSheet/SavingThrows/SavingThrowsDashboard";
import SkillProficiencies from "@/components/CharacterSheet/SkillProficiencies/SkillProficiencies";
import HealthAndBattleDashboard from "@/components/CharacterSheet/HealthAndBattle/HealthAndBattleDashboard";
import CharacterInfo from "@/components/CharacterSheet/CharacterInfo/CharacterInfo";
import { calculateModifier } from "@/utils/helpers";
import { useRouter } from "next/navigation";

const CharacterClient = ({ id }: { id: number }) => {
  const {
    data: characterData,
    loading,
    error,
  } = useQuery(getCharacterQuery, {
    variables: { id: id },
  });

  const {
    data: abilitiesData,
    loading: abilitiesLoading,
    error: abilitiesError,
  } = useQuery(getAbilityScores, {
    variables: { id: characterData?.character?.abilityScoresId },
  });

  const router = useRouter();

  if (loading || abilitiesLoading) return;
  if (error || abilitiesError) return;
  if (!characterData || !abilitiesData) return;

  const handleRedirect = (path: string) => {
    router.push(`/characters/${id}/${path}`);
  };

  return (
    <Box
      width="80%"
      height="100vh"
      display="flex"
      justifySelf="center"
      alignItems="center"
      mx="auto"
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={5}
        spacing={1}
        height="78vh"
        width="100%"
      >
        <Grid item height="100%" xs={12} md={7} lg={4}>
          <Stack direction="column" height="100%" width="100%">
            <CharacterInfo
              character={characterData.character}
              abilityScores={abilitiesData.abilityScores}
            />
            <AbilityScoresDashboard
              abilityScores={abilitiesData.abilityScores}
            />
            <SavingThrowsDashboard
              abilityScores={abilitiesData.abilityScores}
              savingThrows={characterData.character.savingThrows}
              level={characterData.character.level}
            />
          </Stack>
        </Grid>
        <Grid item height="100%" xs={12} md={5} lg={2.5}>
          <SkillProficiencies
            proficiencies={characterData.character.proficiencies}
            abilityScores={abilitiesData.abilityScores}
            level={characterData.character.level}
          />
        </Grid>
        <Grid item width="100%" height="100%" xs={12} md={12} lg={5.5}>
          <HealthAndBattleDashboard
            character={characterData.character}
            initiative={
              calculateModifier(abilitiesData.abilityScores.dexterity).modifier
            }
          />
          <Box
            height="31%"
            border={2}
            borderColor="purple"
            borderRadius={5}
            mt={1}
            bgcolor="#e1e1e1"
            sx={{
              backgroundColor: `rgba(255,255,255,0.4)`,
              backgroundBlendMode: "lighten",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,0,0,.35) transparent",
              zoom: 1,
              "@media (min-width:1700px) and (min-height:950px)": {
                zoom: 1.4,
              },
              "@media (min-width:2050px) and (min-height:1270px)": {
                zoom: 1.7,
              },
            }}
          >
            <Typography
              fontSize={16}
              fontWeight={700}
              textAlign="center"
              mt={1}
            >
              CONDITIONS
            </Typography>
            <Typography fontSize={15} textAlign="center" mt={5}>
              (Conditions are coming in the next patch)
            </Typography>
          </Box>
          <Box height="20%" mt={1}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: 80,
                    border: 2,
                    borderColor: "purple",
                    borderRadius: 5,
                    bgcolor: `rgba(109, 8, 131, 0.5)`,
                    "&:hover": {
                      bgcolor: "purple",
                    },
                  }}
                  onClick={() => handleRedirect("features")}
                >
                  <Typography fontSize={14}>Go to Features</Typography>
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    width: "100%",
                    height: 80,
                    border: 2,
                    borderColor: "purple",
                    borderRadius: 5,
                    // bgcolor: `rgba(109, 8, 131, 0.5)`,
                    bgcolor: "purple",
                    "&:hover": {
                      borderColor: "purple",
                      borderRadius: 5,
                      bgcolor: "purple",
                      backgroundBlendMode: "lighten",
                    },
                  }}
                >
                  <Typography fontSize={12} textAlign="center" color='white'>
                    SPells (Coming Soon)
                  </Typography>
                </Button>
              </Grid>

              <Grid item xs={4}>
                <Button
                  variant="contained"
                  disabled
                  sx={{
                    width: "100%",
                    height: "100%",
                    border: 2,
                    borderColor: "purple",
                    borderRadius: 5,
                    bgcolor: "purple",
                    "&:hover": {
                      borderColor: "purple",
                      borderRadius: 5,
                      bgcolor: "purple",
                      backgroundBlendMode: "lighten",
                    },
                  }}
                >
                  <Typography fontSize={12} color="white">
                    Inventory (coming soon)
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CharacterClient;
