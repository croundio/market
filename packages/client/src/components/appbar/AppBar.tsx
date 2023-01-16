import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MUIAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { RouteEnum } from "../../routing/router";
import { Profile } from "../profile/Profile";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const navigate = useNavigate();

  return (
    <MUIAppBar component="nav">
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
    </MUIAppBar>
  );
};
