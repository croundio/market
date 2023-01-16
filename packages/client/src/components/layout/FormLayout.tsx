import { Box, Toolbar, CssBaseline, Container } from "@mui/material";
import * as React from "react";
import { AppBar } from "../appbar/AppBar";

type AppBarLayoutProps = {
  children: JSX.Element;
};

export const FormLayout = ({ children }: AppBarLayoutProps) => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppBar />
    <Container
      maxWidth="md"
      sx={{
        "& .MuiTextField-root": { mt: 1, mb: 1 },
      }}
    >
      <Toolbar />
      <Toolbar />
      {children}
    </Container>
  </Box>
);
