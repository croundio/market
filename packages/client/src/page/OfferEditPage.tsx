import * as React from "react";
import { useRequireLogged } from "../components/profile/useRequireLogged";
import { FormLayout } from "../components/layout/FormLayout";
import { useNavigate, useParams } from "react-router-dom";
import { RouteEnum } from "../routing/router";
import { OfferEdit } from "../components/offer/OfferEdit";

export const OfferEditPage = () => {
  useRequireLogged();
  const { offerId } = useParams();
  const navigate = useNavigate();

  if (!offerId) {
    navigate(RouteEnum.NOT_FOUND);
  }

  return (
    <FormLayout>
      <OfferEdit offerId={Number(offerId)} />
    </FormLayout>
  );
};
