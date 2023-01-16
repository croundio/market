import { Box, Toolbar, CssBaseline } from "@mui/material";
import * as React from "react";
import { AppBar } from "../appbar/AppBar";

type AppBarLayoutProps = {
  children: JSX.Element | JSX.Element[];
};

export const AppBarLayout = ({ children }: AppBarLayoutProps) => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppBar />
    <Box component="main" sx={{ p: 3, width: "100%" }}>
      <Toolbar />
      {children}
    </Box>
  </Box>
);
