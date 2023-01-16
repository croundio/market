import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { useEffect, useState } from "react";
import { Category } from "@market/server-api";
import { CategoryShort } from "./CategoryShort";

export const CategoryList = () => {
  const { getCategories } = useDataProvider();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Рубрики</Typography>
      <Grid container spacing={5}>
        {categories.map((category) => (
          <Grid item key={category.slug} xs={3}>
            <CategoryShort category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
