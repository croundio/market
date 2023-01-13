import { Box } from "@mui/material";
import {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export const ImageSquare = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [width, setWidth] = useState<string | number>(0);

  const updateResize = useCallback(() => {
    setWidth(props.width || ref.current?.offsetWidth || 0);
  }, []);

  useLayoutEffect(() => {
    updateResize();
  }, []);

  window.addEventListener("resize", updateResize);

  console.log(width);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        height: width,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        onLoad={updateResize}
        style={{
          maxWidth: "100%",
          overflow: "hidden",
        }}
        {...props}
      />
    </Box>
  );
};
