import { Box, Button } from "@mui/material";
import * as React from "react";
import { useProfile } from "./useProfile";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import { RouteEnum } from "../../routing/router";

export const Profile = () => {
  const { profile } = useProfile();

  return (
    <Box sx={{ display: "inline-block", marginRight: 1 }}>
      {profile ? <ProfileMenu /> : <Login />}
    </Box>
  );
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ backgroundColor: "white" }}
      onClick={() => navigate(RouteEnum.LOGIN)}
      color="warning"
      variant="outlined"
    >
      Увійти
    </Button>
  );
};
