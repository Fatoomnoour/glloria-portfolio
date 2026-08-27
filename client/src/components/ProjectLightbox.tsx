import { useEffect, useRef, type RefObject } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { moveGalleryIndex } from "../../../shared/gallery";
import ResponsiveImage from "./ResponsiveImage";

type GalleryImage = { url: string; alt: string; order: number };

export default function ProjectLightbox({
  images,
  openIndex,
  onOpenChange,
  ar,
  returnFocusRef,
}: {
  images: GalleryImage[];
  openIndex: number | null;
  onOpenChange: (index: number | null) => void;
  ar: boolean;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const pointerX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const isOpen = openIndex !== null;
  const index = openIndex ?? 0;
  const current = images[index];
  const go = (delta: number) =>
    onOpenChange(moveGalleryIndex(index, delta, images.length));

  useEffect(() => {
    if (!isOpen || images.length < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, images.length, isOpen]);

  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      return;
    }
    if (wasOpen.current) {
      returnFocusRef.current?.focus();
      wasOpen.current = false;
    }
  }, [isOpen, returnFocusRef]);

  if (!current) return null;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) onOpenChange(null);
      }}
    >
      <DialogContent
        className="project-lightbox"
        showCloseButton={false}
        aria-describedby={undefined}
        onOpenAutoFocus={event => {
          event.preventDefault();
          closeRef.current?.focus();
        }}
      >
        <DialogTitle className="sr-only">
          {ar ? "عرض صور المشروع" : "Project image viewer"}
        </DialogTitle>
        <button
          ref={closeRef}
          type="button"
          className="lightbox-close"
          onClick={() => onOpenChange(null)}
          aria-label={ar ? "إغلاق عرض الصور" : "Close image viewer"}
        >
          <X size={20} />
        </button>
        <div
          className="lightbox-frame"
          onPointerDown={event => {
            pointerX.current = event.clientX;
          }}
          onPointerCancel={() => {
            pointerX.current = null;
          }}
          onPointerUp={event => {
            if (pointerX.current === null || images.length < 2) return;
            const delta = event.clientX - pointerX.current;
            if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
            pointerX.current = null;
          }}
        >
          <ResponsiveImage
            src={current.url}
            alt={current.alt}
            sizes="100vw"
            decoding="async"
          />
          <div className="lightbox-caption">
            <span aria-live="polite">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <p>{current.alt}</p>
          </div>
        </div>
        {images.length > 1 && (
          <div className="lightbox-controls">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={ar ? "الصورة السابقة" : "Previous image"}
            >
              <ChevronRight size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={ar ? "الصورة التالية" : "Next image"}
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
