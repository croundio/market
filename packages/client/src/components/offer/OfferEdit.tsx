import * as React from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { Offer, OfferStatusEnum } from "@market/server-api";
import { useSnackbar } from "notistack";
import { OfferForm } from "./OfferForm";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { RouteEnum, routing } from "../../routing/router";
import { useNavigate } from "react-router-dom";

type OfferEditProps = {
  offerId: number;
};

export const OfferEdit = ({ offerId }: OfferEditProps) => {
  const { updateOffer, getOffer } = useDataProvider();
  const { enqueueSnackbar } = useSnackbar();
  const [offer, setOffer] = useState<Offer>();
  const navigate = useNavigate();

  useEffect(() => {
    getOffer(offerId).then((offer) => setOffer(offer));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = (values: Offer) => {
    updateOffer(offerId, values).then((result: any) => {
      if (result) {
        navigate(
          routing(RouteEnum.OFFERS_OWN, { status: OfferStatusEnum.WAITING })
        );
        enqueueSnackbar("Оголошення успішно оновлено", {
          variant: "success",
        });
      }
    });
  };

  if (!offer) {
    return <Box></Box>;
  }

  return <OfferForm submitHandler={submitHandler} initial={offer} />;
};
