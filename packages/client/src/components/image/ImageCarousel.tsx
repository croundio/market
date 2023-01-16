import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";
import "./style.css";

type ImageCarouselProps = {
  images?: string[];
};

export const ImageCarousel = ({ images = [] }: ImageCarouselProps) => {
  if (!images?.length) {
    images.push("/no_image.jpg");
  }
  return (
    <Carousel
      autoFocus={true}
      autoPlay={false}
      showArrows={true}
      useKeyboardArrows={true}
      showStatus={false}
    >
      {images.map((image) => (
        <Box>
          <img src={image} alt="preview" />
        </Box>
      ))}
    </Carousel>
  );
};
