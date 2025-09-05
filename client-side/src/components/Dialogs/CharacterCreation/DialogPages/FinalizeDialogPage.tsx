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
  handleSubmit,
  handleEdit,
  isEditing,
  hasErrors
}: FinazlieDialogPageType) => {
  return (
    <CustomTabPanel value={value} index={tabNumber}>
      <Stack alignItems="center">
        <Typography variant="h5" textAlign="center" my={10}>
          Your Character is Ready!
        </Typography>
        <Button
          variant="contained"
          disabled={hasErrors}
          onClick={isEditing ? handleEdit : handleSubmit}
          sx={{ width: 150 }}
        >
          {isEditing ? "Update" : "Submit"}
        </Button>
        <Typography variant="body2" color="error" mt={2}>
          {hasErrors ? "You have input errors. Fix them first." : ""}
        </Typography>
      </Stack>
    </CustomTabPanel>
  );
};

export default FinalizeDialogPage;
