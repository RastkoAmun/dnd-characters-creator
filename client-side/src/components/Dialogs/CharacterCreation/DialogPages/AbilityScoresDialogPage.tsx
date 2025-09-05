import React, { useState } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { abilityScoreDefaultForm } from "@/utils/defaultForms";
import { PageNavigation } from "@/utils/types";
import {
  AbilityErrors,
  AbilityKey,
  abilityScoresZodSchema,
} from "@/utils/validationSchemas";

type AbilityScoresDialogPageType = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  abilityScoresForm: typeof abilityScoreDefaultForm;
  setAbilityScoresForm: React.Dispatch<
    React.SetStateAction<typeof abilityScoreDefaultForm>
  >;
  errors: AbilityErrors;
  setErrors: React.Dispatch<React.SetStateAction<AbilityErrors>>;
};

const AbilityScoresDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  abilityScoresForm,
  setAbilityScoresForm,
  errors,
  setErrors,
}: AbilityScoresDialogPageType) => {
  const [strength, setStrength] = useState(abilityScoresForm.strength);
  const [dexterity, setDexterity] = useState(abilityScoresForm.dexterity);
  const [constitution, setConstitution] = useState(
    abilityScoresForm.constitution
  );
  const [intelligence, setIntelligence] = useState(
    abilityScoresForm.intelligence
  );
  const [wisdom, setWisdom] = useState(abilityScoresForm.wisdom);
  const [charisma, setCharisma] = useState(abilityScoresForm.charisma);

  // const [errors, setErrors] = useState<AbilityErrors>({});

  const getters = {
    strength: strength,
    dexterity: dexterity,
    constitution: constitution,
    intelligence: intelligence,
    wisdom: wisdom,
    charisma: charisma,
  };

  const setters = {
    strength: setStrength,
    dexterity: setDexterity,
    constitution: setConstitution,
    intelligence: setIntelligence,
    wisdom: setWisdom,
    charisma: setCharisma,
  };

  const handleAbilityInput = (ability: keyof typeof setters, value: number | string) => {
    const setter = setters[ability];
    setter(value as number);
  };

  const clearError = (key: AbilityKey) =>
    setErrors((prev) => {
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });

  const validateField = (key: AbilityKey, raw: unknown) => {
    const res = abilityScoresZodSchema.shape[key].safeParse(raw);
    if (res.success) {
      clearError(key);
    } else {
      setErrors((prev) => ({ ...prev, [key]: res.error.issues[0]?.message }));
    }
    return res.success;
  };

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack textAlign="center" height="90%">
        <Typography variant="h5" mt={1}>Choose Ability Scores</Typography>
        <Typography fontSize={13}>(set to 10 by default)</Typography>
        <Grid container spacing={3} mt={3}>
          {Object.keys(getters).map((k) => {
            const key = k as AbilityKey;
            return (
              <Grid item key={key} xs={4} justifyItems='center'>
                <Typography textTransform="capitalize">{key}</Typography>
                <TextField
                  variant="standard"
                  value={getters[key]}
                  onChange={(e) => {
                    const n = e.target.value;
                    handleAbilityInput(key, n);
                    clearError(key);
                    validateField(key, n);
                  }}
                  onBlur={(e) => {
                    const n = Number(e.target.value);
                    setAbilityScoresForm((prev) => ({ ...prev, [key]: n }));
                    validateField(key, n);
                  }}
                  error={!!errors[key]}
                  sx={{
                    width: 40,
                    "& .MuiInputBase-input": { textAlign: "center" },
                  }}
                />
                <Typography fontSize={12} color="error" mt={0.5}>
                  {errors[key] ?? " "}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        mt={5}
        columnGap={10}
        position="relative"
        bottom={41}
      >
        <Button
          variant="contained"
          onClick={() => handlePageNavigation.closeButton()}
        >
          Close
        </Button>
        <Stack direction="row" columnGap={2}>
          <Button
            variant="contained"
            onClick={() => handlePageNavigation.goBack()}
          >
            Back
          </Button>
          <Button variant="contained" onClick={() => handlePageNavigation.goNext()}>
            Next
          </Button>
        </Stack>
      </Stack>
    </CustomTabPanel>
  );
};

export default AbilityScoresDialogPage;
