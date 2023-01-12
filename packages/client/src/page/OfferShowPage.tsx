import * as React from "react";
import { FormLayout } from "../components/layout/FormLayout";
import { OfferShow } from "../components/offer/OfferShow";
import { useNavigate, useParams } from "react-router-dom";
import { RouteEnum } from "../routing/router";

export const OfferShowPage = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();

  if (!offerId) {
    navigate(RouteEnum.NOT_FOUND);
  }

  return (
    <FormLayout>
      <OfferShow offerId={Number(offerId)} />
    </FormLayout>
  );
};
