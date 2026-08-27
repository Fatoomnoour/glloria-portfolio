import { getResponsiveImageSource } from "@shared/responsiveImages";
import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> & {
  src: string;
  width?: number;
  height?: number;
};

export default function ResponsiveImage({
  src,
  width,
  height,
  onError,
  ...props
}: ResponsiveImageProps) {
  const source = getResponsiveImageSource(src);

  return (
    <img
      {...props}
      src={src}
      srcSet={source?.srcSet}
      width={source?.width ?? width}
      height={source?.height ?? height}
      onError={event => {
        const image = event.currentTarget;
        if (source && image.dataset.usedOriginalFallback !== "true") {
          image.dataset.usedOriginalFallback = "true";
          image.removeAttribute("srcset");
          image.src = src;
          return;
        }
        onError?.(event);
      }}
    />
  );
}
