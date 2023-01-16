import { useDataProvider } from "../../provider/dataProvider";
import { useEffect, useState } from "react";
import { Offer } from "@market/server-api";
import { Box, Grid, Typography } from "@mui/material";
import { OfferShort } from "./OfferShort";
import * as React from "react";

export const OfferFavoriteList = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const { getFavoriteOffers } = useDataProvider();

  useEffect(() => {
    getFavoriteOffers().then((data) => {
      setOffers(data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Typography variant="h5">Обрані Оголошення</Typography>
      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item key={offer.id} xs={12}>
            <OfferShort
              key={offer.id}
              offer={offer}
              favorited
              imageSize={150}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
