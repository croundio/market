import { Box, Toolbar, Typography } from "@mui/material";
import { AppBarLayout } from "../components/layout/AppBarLayout";
import * as React from "react";
import Button from "@mui/material/Button";
import { useProfile } from "../components/profile/ProfileContext";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../routing/router";
import { server } from "../config/server";

export const LoginPage = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  if (profile) {
    navigate(RouteEnum.MAIN);
  }

  const navigateLoginPage = () => {
    window.location.replace(server.googleAuthPage);
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
