import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { useSnackbar } from "notistack";

type OfferFavoriteButtonProps = {
  favorited: boolean;
  offerId: number;
};

export const FavoriteButton = ({
  favorited,
  offerId,
}: OfferFavoriteButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setFavorite } = useDataProvider();
  const [inFavorite, setInFavorite] = useState(favorited);

  const handleToFavorite = () => {
    setFavorite(offerId, !inFavorite).then((res: any) => {
      if (res) {
        setInFavorite((f) => !f);
        const notifyMessage = inFavorite
          ? "Оголошення видалено"
          : "Оголошення додано в обрані";
        enqueueSnackbar(notifyMessage, {
          variant: "success",
        });
      }
    });
  };

  return (
    <IconButton
      aria-label="add to favorite"
      edge="end"
      color="inherit"
      sx={{ marginRight: 1 }}
      onClick={handleToFavorite}
    >
      {inFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};
