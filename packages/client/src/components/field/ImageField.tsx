import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { Box, CircularProgress, Grid, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import { useCallback, useState } from "react";

type ImageInputProps = {
  maxNumber?: number;
  value: ImageListType;
  onChange: (value: ImageListType, index?: number[]) => void;
};

type Image = {
  dataUrl: string;
  url: string;
  loading: boolean;
};

export const ImageField = ({
  maxNumber = 5,
  value,
  onChange,
}: ImageInputProps) => {
  const [images, setImages] = useState<Image[]>(Array(maxNumber).fill(null));
  const imageHandler = (values: ImageListType, index?: number[]) => {
    console.log(values, index);
    onChange(values, index);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={value}
        onChange={imageHandler}
        maxNumber={maxNumber}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          dragProps,
        }) => (
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
              {images.map((image, index) => {
                if (image) {
                  return (
                    <Grid key={index} item md={2}>
                      <ImagePreview
                        image={image}
                        onUpdate={() => onImageUpdate(index)}
                        onRemove={() => onImageRemove(index)}
                      />
                    </Grid>
                  );
                }

                return (
                  <Grid key={index} item md={2}>
                    <img
                      onClick={() => onImageUpdate(index)}
                      src="/no_image.jpg"
                      style={{
                        maxWidth: "100%",
                        cursor: "pointer",
                        height: 130,
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </ImageUploading>
    </div>
  );
};

type ImagePreviewProps = {
  image: Image;
  onUpdate: () => void;
  onRemove: () => void;
};

const ImagePreview = ({ image, onRemove, onUpdate }: ImagePreviewProps) => {
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
        height: 130,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={handleFocus(true)}
      onMouseLeave={handleFocus(false)}
    >
      <img
        src={image.dataUrl || image.url}
        alt=""
        style={{ maxWidth: "100%" }}
      />
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
