import React, { useState } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import {
  archtypeDefaultForm,
  characterSheetDefault,
} from "@/utils/defaultForms";
import { InputEventType, PageNavigation } from "@/utils/types";
import {
  ArchtypeErrors,
  ArchtypeKey,
  archtypeZodSchema,
} from "@/utils/validationSchemas";

type ArchtypeType = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  archtypeForm: typeof characterSheetDefault.archtype;
  setArchtypeForm: React.Dispatch<
    React.SetStateAction<typeof archtypeDefaultForm>
  >;
  errors: ArchtypeErrors;
  setErrors: React.Dispatch<React.SetStateAction<ArchtypeErrors>>;
  isEditing?: boolean;
  hasErrors: boolean;
  handleEdit?: () => void;
};

const inputTitles = {
  class: "Class",
  subclass: "Subclass",
  race: "Race",
  subrace: "Subrace",
  speed: "Speed",
  armor: "Armor",
};

const ArchtypeDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  archtypeForm,
  setArchtypeForm,
  errors,
  setErrors,
  isEditing,
  hasErrors,
  handleEdit,
}: ArchtypeType) => {
  const [chClass, setChClass] = useState(
    isEditing ? archtypeForm.class : archtypeDefaultForm.class
  );
  const [subclass, setSubclass] = useState(archtypeForm.subclass);
  const [race, setRace] = useState(archtypeForm.race);
  const [subrace, setSubrace] = useState(archtypeForm.subrace);
  const [speed, setSpeed] = useState(archtypeForm.speed);
  const [armor, setArmor] = useState(archtypeForm.armor);

  const clearError = (key: ArchtypeKey) =>
    setErrors((prev) => {
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });

  const validateField = (key: ArchtypeKey, raw: unknown) => {
    const res = archtypeZodSchema.shape[key].safeParse(raw);
    if (res.success) {
      clearError(key);
    } else {
      setErrors((prev) => ({ ...prev, [key]: res.error.issues[0]?.message }));
    }
    return res.success;
  };

  // TextField Handlers
  const handleClassInput = (event: InputEventType) => {
    const input = event.target.value;
    setChClass(input);
    clearError("class");
    validateField("class", input);
  };
  const handleSubclassInput = (event: InputEventType) => {
    const input = event.target.value;
    setSubclass(input);
    clearError("subclass");
    validateField("subclass", input);
  };
  const handleRaceInput = (event: InputEventType) => {
    const input = event.target.value;
    setRace(event.target.value);
    clearError("race");
    validateField("race", input);
  };
  const handleSubraceInput = (event: InputEventType) => {
    const input = event.target.value;
    setSubrace(event.target.value);
    clearError("subrace");
    validateField("subrace", input);
  };
  const handleSpeedInput = (event: InputEventType) => {
    const input = event.target.value;
    setSpeed(Number(event.target.value));
    clearError("speed");
    validateField("speed", input);
  };
  const handleArmorInput = (event: InputEventType) => {
    const input = event.target.value;
    setArmor(Number(event.target.value));
    clearError("armor");
    validateField("armor", input);
  };

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack mt={4}>
        <Grid
          container
          width={600}
          spacing={1}
          columnSpacing={5}
          alignSelf="center"
          mb={2.5}
        >
          {/* Class */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.class}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={chClass}
              onChange={handleClassInput}
              onBlur={(e) => {
                setArchtypeForm((prev) => ({ ...prev, class: e.target.value }));
              }}
              error={!!errors["class"]}
              helperText={errors["class"] ?? " "}
              placeholder="e.g. Druid, Wizard, Bard, Fighter etc."
            />
          </Grid>

          {/* Subclass */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.subclass}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={subclass}
              onChange={handleSubclassInput}
              onBlur={(e) => {
                setArchtypeForm({ ...archtypeForm, subclass: e.target.value });
              }}
              error={!!errors["subclass"]}
              helperText={errors["subclass"] ?? " "}
            />
          </Grid>

          {/* Race */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.race}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={race}
              onChange={handleRaceInput}
              onBlur={(e) => {
                setArchtypeForm((prev) => ({ ...prev, race: e.target.value }));
              }}
              error={!!errors["race"]}
              helperText={errors["race"] ?? " "}
              placeholder="e.g. Human, Elf, Orc, etc."
            />
          </Grid>

          {/* Subrace */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.subrace}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={subrace}
              onChange={handleSubraceInput}
              onBlur={(e) =>
                setArchtypeForm({ ...archtypeForm, subrace: e.target.value })
              }
              error={!!errors["subrace"]}
              helperText={errors["subrace"] ?? " "}
            />
          </Grid>

          {/* Speed */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.speed}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={speed}
              onChange={handleSpeedInput}
              onBlur={(e) =>
                setArchtypeForm({
                  ...archtypeForm,
                  speed: Number(e.target.value),
                })
              }
              error={!!errors["speed"]}
              helperText={errors["speed"] ?? " "}
            />
          </Grid>

          {/* Armor */}
          <Grid item xs={12} md={6}>
            <Typography>{inputTitles.armor}</Typography>
            <TextField
              variant="standard"
              fullWidth
              value={armor}
              onChange={handleArmorInput}
              onBlur={(e) =>
                setArchtypeForm({
                  ...archtypeForm,
                  armor: Number(e.target.value),
                })
              }
              error={!!errors["armor"]}
              helperText={errors["armor"] ?? " "}
            />
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-between"
          mt={5}
          columnGap={10}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={() => handlePageNavigation.closeButton()}
            sx={{ bgcolor: "#fcd2d2" }}
          >
            Cancel
          </Button>
          {isEditing ? (
            <Button
              variant="contained"
              disabled={hasErrors}
              onClick={handleEdit}
              sx={{ ml: 9 }}
            >
              Update
            </Button>
          ) : null}
          <Stack direction="row" columnGap={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handlePageNavigation.goBack()}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handlePageNavigation.goNext()}
            >
              Next
            </Button>
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          color="error"
          textAlign="center"
          mt={-1}
          position="relative"
          bottom={56}
        >
          {hasErrors && isEditing
            ? "You have input errors. Fix them first."
            : ""}
        </Typography>
      </Stack>
    </CustomTabPanel>
  );
};

export default ArchtypeDialogPage;
