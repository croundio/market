import ImageUploading, {
  ErrorsType,
  ImageListType,
  ImageType,
} from "react-images-uploading";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import { useCallback, useState } from "react";
import { useDataProvider } from "../../provider/dataProvider";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useSnackbar } from "notistack";
import { ImageSquare } from "./ImageSquare";

type ImageValue = ImageType & { loading?: boolean };

type ImageInputProps = {
  maxNumber?: number;
  maxFileSize?: number;
  acceptType?: string[];
  value: string[];
  onChange: (images: string[]) => void;
  imageHeight?: number;
};

export const ImageInputList = ({
  maxNumber = 5,
  maxFileSize = 1000000,
  acceptType = ["jpg", "png"],
  value: imageList = [],
  onChange,
  imageHeight = 130,
}: ImageInputProps) => {
  const [refresh, setRefresh] = useState(1);
  const { createImage } = useDataProvider();
  const { enqueueSnackbar } = useSnackbar();
  const uploadedValues: ImageValue[] = imageList.map((url) => ({
    dataURL: url,
  }));

  const handleRemove = (index: number) => {
    onChange(imageList.filter((x, i) => index !== i));
  };
  const handleChange = (values: ImageValue[], index?: number[]) => {
    if (!index) return;

    index.forEach((i) => {
      const file = values[i].file;
      if (!file) return;

      values[i].loading = true;
      setRefresh(Math.random);
      createImage(file).then((res) => {
        if (!res) return;

        imageList[i] = res;
        onChange(imageList);
        values[i].loading = false;
        setRefresh(Math.random);
      });
    });
  };
  const handleErrors = (errors: ErrorsType) => {
    const texts = {
      maxFileSize: "Зображення повинно бути не більше 1М",
      maxNumber: `Можливо завантажити не більш ніж ${maxNumber} зображень`,
      acceptType: `Доступні типи зображень: ${acceptType.join(", ")}`,
      resolution: "Занадто велике розширення",
    };

    if (!errors) return;
    Object.entries(errors).forEach(
      ([k, v]) => v && enqueueSnackbar((texts as any)[k], { variant: "error" })
    );
  };

  return (
    <div className="App">
      {refresh && (
        <ImageUploading
          multiple
          value={uploadedValues}
          onChange={handleChange}
          maxNumber={maxNumber}
          maxFileSize={maxFileSize}
          acceptType={acceptType}
          onError={handleErrors}
        >
          {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
            <Box>
              Фото
              <Box
                className="drag"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: 100,
                  border: "dashed #bbb",
                  borderRadius: 1,
                  mb: 2,
                }}
                onClick={onImageUpload}
                {...dragProps}
              >
                Натисніть або перетягніть сюди фото
              </Box>
              <Grid container spacing={2}>
                <Grid item md={1}></Grid>
                {imageList.map((image, index) => (
                  <Grid key={index} item md={2}>
                    <ImagePreview
                      image={image}
                      onUpdate={() => onImageUpdate(index)}
                      onRemove={() => handleRemove(index)}
                      imageHeight={imageHeight}
                    />
                  </Grid>
                ))}
                {imageList.length < maxNumber && (
                  <Grid item md={2}>
                    <Box
                      sx={{
                        height: "100%",
                        backgroundColor: "#eaeaea",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => onImageUpdate(imageList.length)}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <Typography>Вибрати фото</Typography>
                        <AddPhotoAlternateIcon fontSize="large" />
                      </Box>
                    </Box>
                  </Grid>
                )}
                {maxNumber - imageList.length > 1 &&
                  Array(maxNumber - imageList.length - 1)
                    .fill(null)
                    .map((x, i) => (
                      <Grid key={`fill-${i}`} item md={2}>
                        <ImageSquare src="/no_image.jpg" />
                      </Grid>
                    ))}
              </Grid>
            </Box>
          )}
        </ImageUploading>
      )}
    </div>
  );
};

type ImagePreviewProps = {
  image: ImageType;
  onUpdate: () => void;
  onRemove: () => void;
  imageHeight?: number;
};

const ImagePreview = ({
  image,
  onRemove,
  onUpdate,
  imageHeight = 130,
}: ImagePreviewProps) => {
  console.log(image.dataURL);
  const [focused, setFocused] = useState(false);
  const handleFocus = useCallback(
    (focused: boolean) => () => {
      setFocused(focused);
    },
    []
  );

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={handleFocus(true)}
      onMouseLeave={handleFocus(false)}
    >
      <ImageSquare src={image.dataURL} />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          opacity: 0.6,
          display: focused || image.loading ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image.loading ? (
          <CircularProgress />
        ) : (
          <Box>
            <IconButton sx={{ opacity: 1, color: "white" }} onClick={onUpdate}>
              <MoveUpIcon />
            </IconButton>
            <IconButton sx={{ opacity: 1, color: "white" }} onClick={onRemove}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
