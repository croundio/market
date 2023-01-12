import { AppBarLayout } from "../components/layout/AppBarLayout";
import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export const NotFoundPage = () => {
  return (
    <AppBarLayout>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Сторінка не знайдена!</Typography>
        <Link to="/">На головну</Link>
      </Box>
    </AppBarLayout>
  );
};
