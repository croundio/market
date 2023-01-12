import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDataProvider } from "../../provider/dataProvider";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";

type OfferFavoriteButtonProps = {
  offerId: number;
};

export const DeleteButton = ({ offerId }: OfferFavoriteButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { deleteOffer } = useDataProvider();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (open: boolean) => () => {
    setOpen(open);
  };

  const handleDelete = () => {
    deleteOffer(offerId).then((res: any) => {
      handleOpen(false)();
      if (res) {
        enqueueSnackbar("Оголошення успішно видалено", {
          variant: "success",
        });
      }
    });
  };

  return (
    <Box sx={{ ml: 1 }}>
      <Button
        key="delete"
        size="small"
        variant="outlined"
        color="error"
        onClick={handleOpen(true)}
      >
        Видалити
      </Button>
      <Dialog
        open={open}
        onClose={handleOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Видалити Оголошення</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ви дійсно хочете видалити оголошення із кодом #{offerId}?
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Після видалення повернути оголошення буде неможливо
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="outlined"
            onClick={handleOpen(false)}
            autoFocus
          >
            Відміна
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={handleDelete}
          >
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
