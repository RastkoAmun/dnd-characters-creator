import CustomTabPanel from "@/components/Tabs/CustomTabPanel";
import { PageNavigation } from "@/utils/types";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

type FinazlieDialogPageType = {
  value: number;
  tabNumber: number;
  handlePageNavigation: PageNavigation;
  handleSubmit: () => void;
  handleEdit?: () => void;
  isEditing?: boolean;
  hasErrors: boolean;
};

const FinalizeDialogPage = ({
  value,
  tabNumber,
  handlePageNavigation,
  handleSubmit,
  handleEdit,
  isEditing,
  hasErrors,
}: FinazlieDialogPageType) => {
  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack alignItems="center">
        <Typography variant="h5" textAlign="center" mt={11} mb={5}>
          {hasErrors ? "Double-check Your Tabs!" : "Your Character is Ready!"}
        </Typography>
        <Button
          variant="contained"
          disabled={hasErrors}
          onClick={isEditing ? handleEdit : handleSubmit}
          sx={{ width: 150 }}
        >
          {isEditing ? "Update" : "Submit"}
        </Button>
        <Typography
          variant="body2"
          color="error"
          mt={2}
          sx={{ minHeight: 22, visibility: hasErrors ? "visible" : "hidden" }}
        >
          You have input errors. Fix them first.
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt={14}
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
        <Stack direction="row" columnGap={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handlePageNavigation.goBack()}
          >
            Back
          </Button>
        </Stack>
      </Stack>
    </CustomTabPanel>
  );
};

export default FinalizeDialogPage;
