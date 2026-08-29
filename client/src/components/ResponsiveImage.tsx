import { getResponsiveImageSource } from "@shared/responsiveImages";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> & {
  src: string;
  width?: number;
  height?: number;
};

/**
 * Renders an <img> with automatic responsive srcSet lookup (via the shared
 * `responsiveImages` map) and a graceful, styled fallback UI if the image
 * ultimately fails to load — so a broken-image browser icon never appears
 * on the public site. The fallback preserves the original width/height (or
 * aspect-ratio) so no layout shift occurs when an image fails.
 */
export default function ResponsiveImage({
  src,
  width,
  height,
  onError,
  alt,
  ...props
}: ResponsiveImageProps) {
  const source = getResponsiveImageSource(src);
  const [failed, setFailed] = useState(false);
  const resolvedWidth = source?.width ?? width;
  const resolvedHeight = source?.height ?? height;

  if (failed) {
    return (
      <div
        className="responsive-image-fallback"
        role="img"
        aria-label={typeof alt === "string" ? alt : undefined}
        style={
          resolvedWidth && resolvedHeight
            ? { aspectRatio: `${resolvedWidth} / ${resolvedHeight}` }
            : undefined
        }
      >
        <ImageOff size={28} strokeWidth={1.4} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      {...props}
      src={src}
      srcSet={source?.srcSet}
      width={resolvedWidth}
      height={resolvedHeight}
      alt={alt}
      onError={event => {
        const image = event.currentTarget;
        if (source && image.dataset.usedOriginalFallback !== "true") {
          image.dataset.usedOriginalFallback = "true";
          image.removeAttribute("srcset");
          image.src = src;
          return;
        }
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}
