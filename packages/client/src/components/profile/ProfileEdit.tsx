import { useFormik } from "formik";
import { Box, Button, FormGroup, TextField } from "@mui/material";
import * as React from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { useSnackbar } from "notistack";
import { useProfile } from "./ProfileContext";
import { User } from "@market/server-api";

export const ProfileEdit = () => {
  const { editProfile } = useDataProvider();
  const { enqueueSnackbar } = useSnackbar();
  const { profile, refreshProfile } = useProfile();

  const formik = useFormik({
    initialValues: profile as User,
    onSubmit: (values) => {
      editProfile(values).then((result: any) => {
        if (result) {
          refreshProfile().then(() => {
            enqueueSnackbar("Профіль успішно оновлено", {
              variant: "success",
            });
          });
        }
      });
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <FormGroup>
        <TextField
          fullWidth
          name="name"
          label="Імʼя"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          name="email"
          label="Пошта"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </FormGroup>
      <Button color="primary" variant="contained" type="submit">
        Оновити
      </Button>
    </Box>
  );
};
