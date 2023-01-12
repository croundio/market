import * as React from "react";
import { useRequireLogged } from "../components/profile/useRequireLogged";
import { FormLayout } from "../components/layout/FormLayout";
import { OfferOwnList } from "../components/offer/OfferOwnList";

export const OfferOwnPage = () => {
  useRequireLogged();

  return (
    <FormLayout>
      <OfferOwnList />
    </FormLayout>
  );
};
