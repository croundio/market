import { Box, Toolbar, Typography } from "@mui/material";
import { AppBarLayout } from "../components/layout/AppBarLayout";
import * as React from "react";
import Button from "@mui/material/Button";

export const LoginPage = () => {
  const navigateLoginPage = () => {
    window.location.replace("http://localhost:8811/api/auth/google");
  };

  return (
    <AppBarLayout>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">Доступні методи авторизації:</Typography>
        <Toolbar />
        <Button
          key="create-offer"
          sx={{ backgroundColor: "white" }}
          onClick={navigateLoginPage}
          color="warning"
          variant="outlined"
        >
          Увійти через Google
        </Button>
      </Box>
    </AppBarLayout>
  );
};
