import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useFormik } from "formik";
import { Category, Offer } from "@market/server-api";
import { useEffect, useState } from "react";
import { useDataProvider } from "../../provider/dataProvider";
import { ImageInputList } from "../image/ImageInputList";

type OfferFormProps = {
  submitHandler: (offer: any) => void;
  initial?: any;
};

export const OfferForm = ({ submitHandler, initial }: OfferFormProps) => {
  const { getCategories } = useDataProvider();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formik = useFormik<Offer & { images: any[] }>({
    initialValues: initial || {
      categoryId: 1,
      isUsed: false,
    },
    onSubmit: submitHandler,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <FormGroup>
        <TextField
          fullWidth
          name="title"
          label="Назва"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <ImageInputList
          value={formik.values.images}
          onChange={(value) => {
            formik.setFieldValue("images", value);
          }}
          maxNumber={5}
        />
        {categories.length && (
          <TextField
            name="categoryId"
            select
            label="Категорія"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        <TextField
          fullWidth
          multiline
          rows={5}
          name="description"
          label="Опис"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <TextField
          fullWidth
          name="price"
          label="Ціна"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <FormControlLabel
          control={
            <Switch
              name="isUsed"
              checked={formik.values.isUsed}
              onChange={(v) => {
                v.target.value = v.target.checked as any;
                formik.handleChange(v);
              }}
            />
          }
          label="Був у використанні"
        />
      </FormGroup>
      <Button color="primary" variant="contained" type="submit">
        Подати на модерацію
      </Button>
    </Box>
  );
};
