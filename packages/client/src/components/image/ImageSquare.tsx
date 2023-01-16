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
  const [height, setHeight] = useState<string | number>(0);

  const updateResize = useCallback(() => {
    setHeight(props.width || ref.current?.offsetWidth || 0);
  }, [props.width]);

  useLayoutEffect(() => {
    updateResize();
  }, [updateResize]);

  window.addEventListener("resize", updateResize);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        height,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        alt="preview"
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
