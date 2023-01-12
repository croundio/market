import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { Profile } from "../profile/Profile";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../routing/router";

type AppBarLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

export const AppBarLayout = ({ children }: AppBarLayoutProps) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => navigate(RouteEnum.MAIN)}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
          >
            Market
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
            <Profile />
            <Button
              key="create-offer"
              onClick={() => navigate(RouteEnum.OFFERS_CREATE)}
              sx={{ backgroundColor: "white" }}
              color="warning"
              variant="outlined"
            >
              Подати оголошення
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
