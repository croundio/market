import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { useEffect, useState } from "react";
import { Category } from "@market/server-api";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const { getCategories } = useDataProvider();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Рубрики</Typography>
      <Grid container spacing={5}>
        {categories.map((category) => (
          <Grid item key={category.name} xs={3}>
            <Box>
              <Link to={`/offers/${category.slug}`}>{category.name}</Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
