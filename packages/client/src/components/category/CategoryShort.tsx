import { Avatar, Box } from "@mui/material";
import { Category } from "@market/server-api";
import { Link } from "react-router-dom";
import * as React from "react";

type CategoryShortProps = {
  category: Category;
  size?: number;
};

export const CategoryShort = ({ category, size = 100 }: CategoryShortProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Link to={`/offers/${category.slug}`}>
        <Avatar
          alt={category.slug}
          src={category.image}
          sx={{ width: size, height: size }}
        />
        {category.name}
      </Link>
    </Box>
  );
};
