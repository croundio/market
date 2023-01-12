import * as React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarProps = {
  children: JSX.Element;
};

export const Snackbar = ({ children }: SnackbarProps) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      action={(snackbarId) => <SnackbarAction id={snackbarId} />}
    >
      {children}
    </SnackbarProvider>
  );
};

type SnackbarActionProps = {
  id: number | string;
};

const SnackbarAction = function ({ id }: SnackbarActionProps) {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      color="inherit"
      style={{ marginTop: "0.1em" }}
      onClick={() => {
        closeSnackbar(id);
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
