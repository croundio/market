import * as React from "react";
import { OfferCreate } from "../components/offer/OfferCreate";
import { useRequireLogged } from "../components/profile/useRequireLogged";
import { FormLayout } from "../components/layout/FormLayout";

export const OfferCreatePage = () => {
  useRequireLogged();

  return (
    <FormLayout>
      <OfferCreate />
    </FormLayout>
  );
};
