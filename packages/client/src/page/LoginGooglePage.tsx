import { Box } from "@mui/material";
import { AppBarLayout } from "../components/layout/AppBarLayout";
import * as React from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RouteEnum } from "../routing/router";
import { useProfile } from "../components/profile/ProfileContext";

export const LoginGooglePage = () => {
  const { setToken, refreshProfile } = useProfile();
  const navigate = useNavigate();

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    if (parsed.access_token) {
      setToken(parsed.access_token as string);
      refreshProfile().then(() => {
        navigate(RouteEnum.MAIN);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppBarLayout>
      <Box>
        <div>Помилка авторизації. Спробуйте пізніше</div>
      </Box>
    </AppBarLayout>
  );
};
