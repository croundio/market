import { Box } from "@mui/material";
import { AppBarLayout } from "../components/layout/AppBarLayout";
import * as React from "react";
import { useProfile } from "../components/profile/useProfile";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { RouteEnum, routing } from "../routing/router";
import { OfferStatusEnum } from "@market/server-api";

export const LoginGooglePage = () => {
  const { setToken, refreshProfile } = useProfile();
  const navigate = useNavigate();

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    if (parsed.access_token) {
      setToken(parsed.access_token as string);
      refreshProfile().then(() =>
        navigate(
          routing(RouteEnum.OFFERS_OWN, { status: OfferStatusEnum.ACTIVE })
        )
      );
    }
  }, []);

  return (
    <AppBarLayout>
      <Box>
        <div>Помилка авторизації. Спробуйте пізніше</div>
      </Box>
    </AppBarLayout>
  );
};
