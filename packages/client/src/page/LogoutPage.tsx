import { Box } from "@mui/material";
import { AppBarLayout } from "../components/layout/AppBarLayout";
import * as React from "react";
import { useProfile } from "../components/profile/useProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LogoutPage = () => {
  const { logout } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return (
    <AppBarLayout>
      <Box>
        <div>Ви вийшли зі свого аккаунту</div>
      </Box>
    </AppBarLayout>
  );
};
