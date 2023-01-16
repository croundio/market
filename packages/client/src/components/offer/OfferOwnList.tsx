import { useDataProvider } from "../../provider/dataProvider";
import * as React from "react";
import { useEffect, useState } from "react";
import { Offer, OfferStatusEnum } from "@market/server-api";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { OfferOwnShort } from "./OfferOwnShort";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteEnum, routing } from "../../routing/router";

export const OfferOwnList = () => {
  const navigate = useNavigate();
  const { status = OfferStatusEnum.ACTIVE } = useParams() as {
    status: OfferStatusEnum;
  };

  const [offerCount, setOfferCount] = useState<any>({});
  const [offers, setOffers] = useState<Offer[]>();
  const { getOwnOffers, getOwnOffersCount } = useDataProvider();
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: OfferStatusEnum
  ) => {
    navigate(routing(RouteEnum.OFFERS_OWN, { status: newValue }));
  };

  useEffect(() => {
    getOwnOffers(status).then((data) => {
      setOffers(data);
    });
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getOwnOffersCount().then((data: object) => {
      setOfferCount(data);
    });
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Typography variant="h5">Подані Оголошення</Typography>

      <Tabs
        value={status}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          label={`Активні (${offerCount[OfferStatusEnum.ACTIVE] || 0})`}
          value={OfferStatusEnum.ACTIVE}
        />
        <Tab
          label={`Очікуючі (${offerCount[OfferStatusEnum.WAITING] || 0})`}
          value={OfferStatusEnum.WAITING}
        />
        <Tab
          label={`Неактивні (${offerCount[OfferStatusEnum.DEACTIVATE] || 0})`}
          value={OfferStatusEnum.DEACTIVATE}
        />
        <Tab
          label={`Відхилені (${offerCount[OfferStatusEnum.CANCELED] || 0})`}
          value={OfferStatusEnum.CANCELED}
        />
      </Tabs>
      {offers && !offers.length && <EmptyList />}
      <Grid container spacing={3}>
        {offers &&
          offers.map((offer) => (
            <Grid item key={offer.id} xs={12}>
              <OfferOwnShort key={offer.id} offer={offer} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

const EmptyList = () => (
  <Box sx={{ m: 5, textAlign: "center" }}>
    <Typography variant="h5">Hемає оголошень.</Typography>
    <Link to={RouteEnum.OFFERS_CREATE}>Подати оголошення</Link>
  </Box>
);
