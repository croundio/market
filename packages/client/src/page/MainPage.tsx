import * as React from "react";
import { AppBarLayout } from "../components/layout/AppBarLayout";
import { CategoryList } from "../components/category/CategoryList";
import { OfferList } from "../components/offer/OfferList";
import { useParams } from "react-router-dom";

export const MainPage = () => {
  let { category } = useParams();

  return (
    <AppBarLayout>
      <CategoryList />
      <OfferList category={category} />
    </AppBarLayout>
  );
};
