import * as React from "react";
import { useRequireLogged } from "../components/profile/useRequireLogged";
import { FormLayout } from "../components/layout/FormLayout";
import { OfferFavoriteList } from "../components/offer/OfferFavoriteList";

export const OfferFavoritePage = () => {
  useRequireLogged();

  return (
    <FormLayout>
      <OfferFavoriteList />
    </FormLayout>
  );
};
