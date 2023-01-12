import { OfferShort } from "./OfferShort";
import * as React from "react";
import { Offer, OfferStatusEnum } from "@market/server-api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RouteEnum, routing } from "../../routing/router";
import { useDataProvider } from "../../provider/dataProvider";
import { useCallback } from "react";
import { useSnackbar } from "notistack";
import { DeleteButton } from "./DeleteButton";

type OfferOwnShortProps = {
  offer: Offer;
};

export const OfferOwnShort = ({ offer }: OfferOwnShortProps) => {
  const { setOfferStatus } = useDataProvider();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (status: "ACTIVE" | "DEACTIVATE") => () => {
      setOfferStatus(offer.id, status).then(() => {
        navigate(routing(RouteEnum.OFFERS_OWN, { status }));
        enqueueSnackbar("Оголошення успішно оновлено", {
          variant: "success",
        });
      });
    },
    []
  );

  const actions = [
    <Button
      key="edit"
      size="small"
      variant="outlined"
      sx={{ ml: "auto" }}
      onClick={() => {
        navigate(RouteEnum.OFFERS_EDIT.replace(":offerId", `${offer.id}`));
      }}
    >
      Редагувати
    </Button>,
    <DeleteButton key="delete" offerId={offer.id} />,
  ];

  if (offer.status === OfferStatusEnum.ACTIVE) {
    actions.unshift(
      <Button
        color="warning"
        key="deactivate"
        size="small"
        variant="outlined"
        sx={{ ml: "auto" }}
        onClick={handleClick(OfferStatusEnum.DEACTIVATE)}
      >
        Дезактивувати
      </Button>
    );
  }
  if (offer.status === OfferStatusEnum.DEACTIVATE) {
    actions.unshift(
      <Button
        color="success"
        key="deactivate"
        size="small"
        variant="outlined"
        sx={{ ml: "auto" }}
        onClick={handleClick(OfferStatusEnum.ACTIVE)}
      >
        Активувати
      </Button>
    );
  }
  return (
    <OfferShort
      offer={offer}
      showFavorited={false}
      actions={actions}
      imageSize={150}
    />
  );
};
