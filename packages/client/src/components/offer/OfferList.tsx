import { useDataProvider } from "../../provider/dataProvider";
import { useCallback, useEffect, useState } from "react";
import { Offer } from "@market/server-api";
import { Box, Button, Grid, Typography } from "@mui/material";
import { OfferShort } from "./OfferShort";
import * as React from "react";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../routing/router";
import { Loader } from "../loader/Loader";

type OfferListProps = {
  category?: string;
};

export const OfferList = ({ category }: OfferListProps) => {
  const limit = 3;
  const [offers, setOffers] = useState<Offer[]>();
  const [more, setMore] = useState(false);
  const { getOffers } = useDataProvider();

  const loadMore = useCallback(() => {
    if (!offers?.length) return;
    getOffers({ limit, category, cursor: offers[offers.length - 1].id }).then(
      (data) => {
        setOffers((offers) => [...(offers || []), ...data]);
        setMore(data.length === limit);
      }
    );
  }, [getOffers, limit, offers, category]);

  useEffect(() => {
    getOffers({ limit, category }).then((data) => {
      setOffers(data);
      setMore(data.length === limit);
    });
  }, [category, limit]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!offers) {
    return <Loader />;
  }

  if (!offers.length) {
    return <EmptyList />;
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5">Оголошення:</Typography>
      <Grid container spacing={3}>
        {offers.map((offer) => (
          <Grid item key={offer.id} xs={12}>
            <OfferShort
              key={offer.id}
              offer={offer}
              favorited={!!offer.favorites?.length}
            />
          </Grid>
        ))}
      </Grid>
      {more && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            key="more"
            onClick={loadMore}
            sx={{ backgroundColor: "white" }}
            color="primary"
            variant="outlined"
          >
            Загрузити більше
          </Button>
        </Box>
      )}
    </Box>
  );
};

const EmptyList = () => (
  <Box sx={{ mt: 5, textAlign: "center" }}>
    <Typography variant="h5">В данній катерогії немає оголошень</Typography>
    <Link to={RouteEnum.MAIN}>На головну</Link>
  </Box>
);
