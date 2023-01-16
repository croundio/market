import { Box, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { useEffect, useState } from "react";
import { Category } from "@market/server-api";
import { CategoryShort } from "./CategoryShort";
import { Loader } from "../loader/Loader";

type CategoryListProps = {
  category?: string;
};

export const CategoryList = ({ category }: CategoryListProps) => {
  const { getCategories } = useDataProvider();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!categories) {
    return <Loader />;
  }

  const currentCategory = categories.find((c) => c.slug === category);

  if (currentCategory) {
    return (
      <Box>
        <Typography variant="h5">Категорія: {currentCategory.name}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5">Категорії</Typography>
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
