import { Offer } from "@market/server-api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Toolbar,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { FavoriteButton } from "./FavoriteButton";
import { useEffect, useState } from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { EmailButton } from "../button/EmailButton";
import { useProfile } from "../profile/useProfile";
import { RouteEnum } from "../../routing/router";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ImageCarousel } from "../image/ImageCarousel";

type OfferShowParams = {
  offerId: number;
};

export const OfferShow = ({ offerId }: OfferShowParams) => {
  const { getOffer } = useDataProvider();
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [offer, setOffer] = useState<Offer>();
  useEffect(() => {
    getOffer(offerId).then((offer: Offer) => {
      setOffer(offer);
    });
  }, []);

  if (!offer) {
    return <Box></Box>;
  }

  const authorAction =
    offer.ownerId === profile?.id ? (
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
      </Button>
    ) : (
      <Box>
        <Typography sx={{ m: 1 }}>Автор: {offer.owner.name}</Typography>
        <EmailButton
          email={offer.owner.email}
          subject={`Market: #${offer.id} - ${offer.title}`}
        />
      </Box>
    );
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <FavoriteButton
            favorited={!!offer.favorites?.length}
            offerId={offer.id}
          />
          <Typography variant="h6" sx={{ m: 1 }}>
            {offer.price} ₴
          </Typography>
        </Box>
        <ImageCarousel images={offer.images} />
        <Typography variant="h6">{offer.title}</Typography>
        <Box>
          <Chip label={offer.category.name} variant="outlined" size="small" />
        </Box>
        <Typography>Код: #{offer.id}</Typography>
        <Toolbar />
        <Typography variant="h6">{offer.description}</Typography>
        <Toolbar />
        <Typography variant="caption">
          Додано: {format(new Date(offer.createdAt), "dd-MM-yyyy HH:ii:ss")}
        </Typography>
        <Box sx={{ display: "block", textAlign: "end" }}>{authorAction}</Box>
      </CardContent>
    </Card>
  );
};
