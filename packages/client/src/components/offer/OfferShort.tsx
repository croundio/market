import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Offer } from "@market/server-api";
import { format } from "date-fns";
import { FavoriteButton } from "./FavoriteButton";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../routing/router";

type OfferShortProps = {
  offer: Offer;
  favorited?: boolean;
  showFavorited?: boolean;
  actions?: JSX.Element[];
  imageSize?: number;
};

export const OfferShort = ({
  offer,
  favorited = false,
  showFavorited = true,
  actions,
  imageSize = 200,
}: OfferShortProps) => {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item md={3}>
            <Link to={RouteEnum.OFFER.replace(":offerId", `${offer.id}`)}>
              <img
                src="/no_image.jpg"
                loading="lazy"
                alt="no image"
                width={imageSize}
              />
            </Link>
          </Grid>
          <Grid item md={6}>
            <Box sx={{ m: 1 }}>
              <Link to={RouteEnum.OFFER.replace(":offerId", `${offer.id}`)}>
                <Typography variant="h6">{offer.title}</Typography>
              </Link>
              <Box>
                <Chip
                  label={offer.category.name}
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Typography variant="caption">
                Додано:{" "}
                {format(new Date(offer.createdAt), "dd-MM-yyyy HH:ii:ss")}
              </Typography>
              <Typography>Код: #{offer.id}</Typography>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              {showFavorited && (
                <FavoriteButton favorited={favorited} offerId={offer.id} />
              )}
              <Typography variant="h6" sx={{ m: 1 }}>
                {offer.price} ₴
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};
