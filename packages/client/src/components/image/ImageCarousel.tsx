import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";

type ImageCarouselProps = {
  images?: string[];
};

export const ImageCarousel = ({ images = [] }: ImageCarouselProps) => {
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
          <img src={image} />
        </Box>
      ))}
    </Carousel>
  );
};
