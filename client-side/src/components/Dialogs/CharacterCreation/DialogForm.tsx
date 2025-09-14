import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Dialog, Tabs, Tab } from "@mui/material";
import CoreDialogPage from "./DialogPages/CoreDialogPage";
import {
  archtypeDefaultForm,
  abilityScoreDefaultForm,
  coreInfoDefaultForm,
  healthDefaultForm,
  proficienciesDefaultForm,
} from "@/utils/defaultForms";
import ArchtypeDialogPage from "./DialogPages/ArchtypeDialogPage";
import {
  CharacterCreationTabNumbers,
  SavingThrowsProficiencies,
  SkillProficiencies,
} from "@/utils/helpers";
import AbilityScoresDialogPage from "./DialogPages/AbilityScoresDialogPage";
import FinalizeDialogPage from "./DialogPages/FinalizeDialogPage";
import { useMutation } from "@apollo/client";
import { createAbilityScores } from "@/state/remote/mutations/createAbilityScores";
import { createCharacter } from "@/state/remote/mutations/createCharacter";
import ProficienciesDialogPage from "./DialogPages/ProficienciesDialogPage";
import { AbilityScoresQueryType, CharacterType } from "@/utils/types";
import { updateCharacter } from "@/state/remote/mutations/updateCharacter";
import { updateAbilityScores } from "@/state/remote/mutations/updateAbilityScores";
import { getAllCharactersQuery } from "@/state/remote/queries/getAllCharacters";
import {
  AbilityErrors,
  AbilityKey,
  ArchtypeErrors,
  ArchtypeKey,
  characterCreateZodSchema,
  CoreInfoErrors,
  CoreInfoKey,
} from "@/utils/validationSchemas";

const tabLabels = {
  main: {
    core: "Core",
    archtype: "Archtype",
    scores: "Ability Scores",
    proficiencies: "Proficiencies",
  },
  finish: "Finish",
};

const CharacterCreationDialog = ({
  isOpen,
  isEditingMode,
  characterInfo,
  abilityScores,
  setIsOpen,
  setIsEditing,
}: {
  isOpen: boolean;
  isEditingMode?: boolean;
  characterInfo?: CharacterType;
  abilityScores?: AbilityScoresQueryType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState(0);
  const [coreForm, setCoreForm] = useState(coreInfoDefaultForm);
  const [healthForm, setHealthForm] = useState(healthDefaultForm);
  const [archtypeForm, setArchtypeForm] = useState(archtypeDefaultForm);
  const [abilityScoresForm, setAbilityScoresForm] = useState(
    abilityScoreDefaultForm
  );
  const [proficienciesForm, setProficienciesForm] = useState(
    proficienciesDefaultForm
  );

  const [abilityErrors, setAbilityErrors] = useState<AbilityErrors>({});
  const [archtypeErrors, setArchtypeErrors] = useState<ArchtypeErrors>({});
  const [coreInfoErrors, setCoreInfoErrors] = useState<CoreInfoErrors>({});

  const hasAnyErrors =
    Object.values(abilityErrors).some(Boolean) ||
    Object.values(archtypeErrors).some(Boolean) ||
    Object.values(coreInfoErrors).some(Boolean);

  useEffect(() => {
    if (isEditingMode && characterInfo && abilityScores) {
      setCoreForm({
        name: characterInfo.name,
        level: characterInfo.level,
      });
      setArchtypeForm({
        class: characterInfo.class,
        subclass: characterInfo.subclass,
        race: characterInfo.race,
        subrace: characterInfo.subrace,
        speed: characterInfo.speed as number,
        armor: characterInfo.armor as number,
      });
      setHealthForm({
        healthDice: characterInfo.healthDice,
        tempHealth: characterInfo.tempHealth,
        currentHealth: characterInfo.currentHealth,
        maxHealth: characterInfo.maxHealth,
      });
      setAbilityScoresForm({
        strength: abilityScores.strength,
        dexterity: abilityScores.dexterity,
        constitution: abilityScores.constitution,
        intelligence: abilityScores.intelligence,
        wisdom: abilityScores.wisdom,
        charisma: abilityScores.charisma,
      });
      setProficienciesForm({
        proficiencies: characterInfo.proficiencies as SkillProficiencies[],
        savingThrows: characterInfo.savingThrows as SavingThrowsProficiencies[],
      });
    }
  }, [characterInfo, isEditingMode, abilityScores]);

  const [createAbilityScoresMutation] = useMutation(createAbilityScores);
  const [createCharacterMutation] = useMutation(createCharacter, {
    refetchQueries: [getAllCharactersQuery],
  });

  const [updateAbilityScoresMutation] = useMutation(updateAbilityScores);
  const [updateCharacterMutation] = useMutation(updateCharacter);

  const has = (o: Record<string, unknown>) => Object.keys(o).length > 0;

  const validateAllBeforeSubmit = React.useCallback(() => {
    const res = characterCreateZodSchema.safeParse({
      archtype: archtypeForm,
      abilityScores: abilityScoresForm,
      coreInfo: {
        name: coreForm.name,
        maxHealth: healthForm.maxHealth,
      },
    });

    setArchtypeErrors({});
    setAbilityErrors({});
    setCoreInfoErrors({});

    if (res.success) return true;

    const archErrs: ArchtypeErrors = {};
    const abilErrs: AbilityErrors = {};
    const coreErrs: CoreInfoErrors = {};

    for (const issue of res.error.issues) {
      const [slice, field] = issue.path as [
        "archtype" | "abilityScores" | "coreInfo",
        string
      ];
      const msg = issue.message;

      if (slice === "archtype") {
        (archErrs as Record<ArchtypeKey, string>)[field as ArchtypeKey] ??= msg;
      } else if (slice === "abilityScores") {
        (abilErrs as Record<AbilityKey, string>)[field as AbilityKey] ??= msg;
      } else if (slice === "coreInfo") {
        (coreErrs as Record<CoreInfoKey, string>)[field as CoreInfoKey] ??= msg;
      }
    }

    setArchtypeErrors(archErrs);
    setAbilityErrors(abilErrs);
    setCoreInfoErrors(coreErrs);

    if (has(coreErrs)) setValue(CharacterCreationTabNumbers.CORE);
    else if (has(archErrs)) setValue(CharacterCreationTabNumbers.ARCHTYPE);
    else if (has(abilErrs))
      setValue(CharacterCreationTabNumbers.ABILITY_SCORES);

    return false;
  }, [archtypeForm, abilityScoresForm, coreForm, healthForm]);

  const resetForms = () => {
    setValue(0);
    setArchtypeErrors({});
    setAbilityErrors({});
    setCoreInfoErrors({});
    setCoreForm(coreInfoDefaultForm);
    setHealthForm(healthDefaultForm);
    setArchtypeForm(archtypeDefaultForm);
    setAbilityScoresForm(abilityScoreDefaultForm);
    setProficienciesForm(proficienciesDefaultForm);
    setIsOpen(false);
    if (setIsEditing) {
      setIsEditing(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateAllBeforeSubmit()) return;

    let abilityScoresID: number = 0;

    try {
      const response = await createAbilityScoresMutation({
        variables: { input: { ...abilityScoresForm } },
      });
      abilityScoresID = response.data.createAbilityScores.id;
      console.log(
        "Ability Scores Submitted:",
        response.data.createAbilityScores
      );
    } catch (err) {
      console.error("Error submitting ability scores:", err);
    }

    const character = {
      ...coreForm,
      ...healthForm,
      ...archtypeForm,
      ...proficienciesForm,
      abilityScoresId: abilityScoresID,
    };

    try {
      const response = await createCharacterMutation({
        variables: { input: { ...character } },
      });
      console.log("Character Submitted:", response.data.createCharacter);
    } catch (err) {
      console.error("Error submitting character:", err);
    }

    resetForms();
  };

  const handleEdit = async () => {
    try {
      const response = await updateAbilityScoresMutation({
        variables: {
          id: characterInfo?.abilityScoresId,
          input: { ...abilityScoresForm },
        },
      });
    } catch (err) {
      console.error("Error submitting ability scores:", err);
    }

    const character = {
      ...coreForm,
      ...archtypeForm,
      ...proficienciesForm,
      ...healthForm,
      currentHealth: 
        (characterInfo?.currentHealth as number) > healthForm.maxHealth
          ? healthForm.maxHealth
          : characterInfo?.currentHealth,
      tempHealth: characterInfo?.tempHealth,
    };

    try {
      const response = await updateCharacterMutation({
        variables: { id: characterInfo?.id, input: { ...character } },
      });
    } catch (err) {
      console.error("Error submitting character:", err);
    }

    setIsOpen(false);
    if (setIsEditing) {
      setIsEditing(false);
    }
    setValue(0);
  };

  const handlePageNavigation = {
    goNext: () => setValue(value + 1),
    goBack: () => setValue(value - 1),
    closeButton: () => {
      resetForms();
    },
  };

  return (
    <Dialog
      open={isOpen}
      maxWidth={false}
      PaperProps={{
        sx: {
          height: 470,
        },
      }}
    >
      <Box borderBottom={1}>
        <Tabs
          value={value}
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {Object.entries(tabLabels.main).map(([key, value], index) => (
            <Tab
              key={key}
              label={value}
              onClick={() => setValue(index)}
              sx={{
                width: 155,
                borderRight: 1,
                "&.Mui-selected": {
                  backgroundColor: "teal",
                  color: "white",
                },
              }}
            />
          ))}
          <Tab
            label={tabLabels.finish}
            onClick={() => setValue(CharacterCreationTabNumbers.FINALIZE)}
            color="green"
            sx={{
              width: 180,
              "&.Mui-selected": {
                backgroundColor: "teal",
                color: "white",
              },
            }}
          />
        </Tabs>
      </Box>
      <CoreDialogPage
        value={value}
        tabNumber={CharacterCreationTabNumbers.CORE}
        handlePageNavigation={handlePageNavigation}
        coreForm={coreForm}
        healthForm={healthForm}
        setCoreForm={setCoreForm}
        setHealthForm={setHealthForm}
        errors={coreInfoErrors}
        setErrors={setCoreInfoErrors}
        isEditing={isEditingMode}
        hasErrors={hasAnyErrors}
        handleEdit={handleEdit}
      />
      <ArchtypeDialogPage
        value={value}
        tabNumber={CharacterCreationTabNumbers.ARCHTYPE}
        handlePageNavigation={handlePageNavigation}
        setArchtypeForm={setArchtypeForm}
        archtypeForm={archtypeForm}
        errors={archtypeErrors}
        setErrors={setArchtypeErrors}
        isEditing={isEditingMode}
        hasErrors={hasAnyErrors}
        handleEdit={handleEdit}
      />
      <AbilityScoresDialogPage
        value={value}
        tabNumber={CharacterCreationTabNumbers.ABILITY_SCORES}
        handlePageNavigation={handlePageNavigation}
        abilityScoresForm={abilityScoresForm}
        setAbilityScoresForm={setAbilityScoresForm}
        errors={abilityErrors}
        setErrors={setAbilityErrors}
        isEditing={isEditingMode}
        hasErrors={hasAnyErrors}
        handleEdit={handleEdit}
      />
      <ProficienciesDialogPage
        value={value}
        tabNumber={CharacterCreationTabNumbers.PROFICIENCIES}
        handlePageNavigation={handlePageNavigation}
        proficienciesForm={proficienciesForm}
        setProficienciesForm={setProficienciesForm}
        isEditing={isEditingMode}
        hasErrors={hasAnyErrors}
        handleEdit={handleEdit}
      />
      <FinalizeDialogPage
        value={value}
        tabNumber={CharacterCreationTabNumbers.FINALIZE}
        handlePageNavigation={handlePageNavigation}
        handleSubmit={handleSubmit}
        handleEdit={handleEdit}
        isEditing={isEditingMode}
        hasErrors={hasAnyErrors}
      />
    </Dialog>
  );
};

export default CharacterCreationDialog;
