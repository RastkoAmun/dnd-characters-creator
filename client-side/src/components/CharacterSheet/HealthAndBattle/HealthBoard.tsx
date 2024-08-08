import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const hitPointsLabels = {
  title: "HIT POINTS",
  hpType: {
    current: "CURRENT",
    max: "MAX",
    temp: "TEMP",
  },
  buttons: {
    heal: "HEAL",
    deal: "DEAL",
  },
};

type HealthStackType = {
  label: string;
  value: number | string;
  color?: string;
};

const HealthStack = ({ label, value, color }: HealthStackType) => {
  return (
    <Stack alignItems="center">
      <Typography color={color ?? undefined}>{label}</Typography>
      <Typography fontSize={30}>{value}</Typography>
    </Stack>
  );
};

const HealthBoard = () => {
  return (
    <Stack width={350} height={150}>
      <Typography m={0.8} textAlign="center" fontWeight={700} fontSize={17}>
        {hitPointsLabels.title}
      </Typography>
      <Grid container>
        <Grid item xs={8}>
          <Stack direction="row" columnGap={3} justifyContent="center">
            <HealthStack label={hitPointsLabels.hpType.current} value={23} />
            <HealthStack label="/" value="/" color="transparent" />
            <HealthStack label={hitPointsLabels.hpType.max} value={45} />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <HealthStack label={hitPointsLabels.hpType.temp} value="-" />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        mx={2}
        mt={1}
        columnGap={1}
      >
        <Button
          variant="outlined"
          sx={{ borderColor: "green", color: "green", height: 28 }}
        >
          {hitPointsLabels.buttons.heal}
        </Button>
        <TextField
          size="small"
          sx={{ width: 80,
            //  height: 50 
            }}
          inputProps={{ style: { textAlign: "center", padding: 3 } }}
        />
        <Button
          variant="outlined"
          size="small"
          sx={{ borderColor: "red", color: "red", height: 28 }}
        >
          {hitPointsLabels.buttons.deal}
        </Button>
      </Stack>
    </Stack>
  );
};

export default HealthBoard;
