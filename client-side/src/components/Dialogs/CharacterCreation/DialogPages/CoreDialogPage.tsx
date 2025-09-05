import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { InputEventType, PageNavigation } from "@/utils/types";
import { coreInfoDefaultForm, healthDefaultForm } from "@/utils/defaultForms";
import { teal } from "@mui/material/colors";
import {
  CoreInfoErrors,
  CoreInfoKey,
  coreInfoZodSchema,
} from "@/utils/validationSchemas";

type HealthDice = "d6" | "d8" | "d10" | "d12" | "" | null;

type CharacterCreationPageProps = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  coreForm: typeof coreInfoDefaultForm;
  healthForm: typeof healthDefaultForm;
  setCoreForm: React.Dispatch<React.SetStateAction<typeof coreInfoDefaultForm>>;
  setHealthForm: React.Dispatch<React.SetStateAction<typeof healthDefaultForm>>;
  errors: CoreInfoErrors;
  setErrors: React.Dispatch<React.SetStateAction<CoreInfoErrors>>;
  isEditing?: boolean;
  hasErrors: boolean;
};

const labels = {
  name: "Character Name",
  level: "Level",
  health: "Health Points (HP)",
  dice: "Health Dice",
};

const healthDiceArray: HealthDice[] = ["d6", "d8", "d10", "d12"];

const CoreDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  coreForm,
  healthForm,
  setCoreForm,
  setHealthForm,
  errors,
  setErrors,
  isEditing,
  hasErrors,
}: CharacterCreationPageProps) => {
  const [name, setName] = useState(coreForm.name);
  const [health, setHealth] = useState(healthForm.maxHealth);
  const [level, setLevel] = useState(coreForm.level);
  const [healthDice, setHealthDice] = useState(healthForm.healthDice);

  const clearError = useCallback(
    (key: CoreInfoKey) =>
      setErrors((prev) => {
        const { [key]: _removed, ...rest } = prev;
        return rest;
      }),
    [setErrors]
  );

  const validateField = useCallback(
    (key: CoreInfoKey, raw: unknown) => {
      const res = coreInfoZodSchema.shape[key].safeParse(raw);
      if (res.success) {
        clearError(key); // remove key entirely
      } else {
        setErrors((prev) => ({ ...prev, [key]: res.error.issues[0]?.message }));
      }
      return res.success;
    },
    [clearError, setErrors]
  );

  // Handlers
  const handleNameInput = (event: InputEventType) => {
    const input = event.target.value;
    setName(input);
    clearError("name");
    validateField("name", input);
  };
  const handleHealthInput = (event: InputEventType) => {
    const input = event.target.value;
    setHealth(Number(input));
    clearError("maxHealth");
    validateField("maxHealth", input);
  };
  const handleHealthDiceInput = (event: InputEventType) => {
    setHealthDice(event.target.value);
  };

  const levelButtons = useMemo(
    () => (
      <Box display="grid" gridTemplateColumns="repeat(10, 1fr)" gap={1} mb={2}>
        {Array.from({ length: 20 }, (_, i) => {
          const n = i + 1;
          const selected = level === n;
          return (
            <Button
              key={n}
              size="small"
              variant={selected ? "contained" : "outlined"}
              onClick={() => {
                setCoreForm({ ...coreForm, level: n }), setLevel(n);
              }}
              sx={{
                minWidth: 30,
                height: 30,
                fontWeight: 500,
                lineHeight: 1,
                px: 0.5,
                borderColor: selected ? teal[700] : teal[500],
                color: selected ? "#fff" : teal[700],
                bgcolor: selected ? teal[600] : "transparent",
                "&:hover": {
                  bgcolor: selected ? teal[700] : "rgba(0,0,0,0.04)",
                  borderColor: teal[700],
                },
              }}
            >
              {n}
            </Button>
          );
        })}
      </Box>
    ),
    [level, coreForm, setCoreForm]
  );

  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack rowGap={2} mb={3}>
        <Stack direction="row" gap={10}>
          <Stack>
            <Typography>{labels.name}</Typography>
            <TextField
              variant="standard"
              value={name}
              onChange={handleNameInput}
              onBlur={(e) => {
                setCoreForm({ ...coreForm, name: e.target.value });
                clearError("name");
                validateField("name", e.target.value);
              }}
              error={!!errors["name"]}
              helperText={errors["name"] ?? " "}
            />
          </Stack>

          <Stack>
            <Typography>{labels.health}</Typography>
            <TextField
              variant="standard"
              value={health}
              type="number"
              onChange={handleHealthInput}
              onBlur={(e) => {
                setHealthForm({
                  ...healthForm,
                  maxHealth: Number(e.target.value),
                  currentHealth: Number(e.target.value),
                  tempHealth: 0,
                });
                clearError("maxHealth");
                validateField("maxHealth", e.target.value);
              }}
              error={!!errors["maxHealth"]}
              sx={{ width: 90 }}
            />
            <Typography fontSize={12} color="error" mt={0.5}>
              {errors["maxHealth"] ?? ""}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Typography mb={1}>{labels.level}</Typography>
          {levelButtons}
        </Stack>
        <Stack>
          <Typography>{labels.dice}</Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={healthDice}
            onChange={handleHealthDiceInput}
          >
            <Stack direction="row">
              {healthDiceArray.map((dice) => (
                <FormControlLabel
                  key={dice}
                  value={dice}
                  control={
                    <Radio
                      onClick={() =>
                        setHealthForm({
                          ...healthForm,
                          healthDice: dice as string,
                        })
                      }
                      sx={{
                        "&.Mui-checked": {
                          color: "teal",
                        },
                      }}
                    />
                  }
                  label={dice}
                />
              ))}
            </Stack>
          </RadioGroup>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={5}
        columnGap={10}
        position="relative"
        bottom={-12}
      >
        <Button
          variant="contained"
          onClick={() => handlePageNavigation.closeButton()}
        >
          Close
        </Button>
        {isEditing ? <Button variant="contained">Update</Button> : null}
        <Button
          variant="contained"
          onClick={() => handlePageNavigation.goNext()}
        >
          Next
        </Button>
      </Stack>
      <Typography
        variant="body2"
        color="error"
        textAlign="center"
        mt={1}
        position="relative"
        bottom={60}
      >
        {hasErrors && isEditing ? "You have input errors. Fix them first." : ""}
      </Typography>
    </CustomTabPanel>
  );
};

export default CoreDialogPage;
