import * as React from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { useNavigate } from "react-router-dom";
import { RouteEnum, routing } from "../../routing/router";
import { Offer, OfferStatusEnum } from "@market/server-api";
import { useSnackbar } from "notistack";
import { OfferForm } from "./OfferForm";

export const OfferCreate = () => {
  const { createOffer } = useDataProvider();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const submitHandler = (values: Offer) => {
    createOffer(values).then((result: any) => {
      if (result) {
        navigate(
          routing(RouteEnum.OFFERS_OWN, { status: OfferStatusEnum.WAITING })
        );
        enqueueSnackbar("Оголошення успішно добавлено", {
          variant: "success",
        });
      }
    });
  };

  return <OfferForm submitHandler={submitHandler} />;
};
