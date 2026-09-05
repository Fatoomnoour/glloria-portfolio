#!/usr/bin/env bash
#
# Glloria — real project photography ingestion pipeline
# =====================================================
#
# Converts the studio's original photos/renders into the responsive WebP
# variants the site expects, and prints ready-to-paste TypeScript entries for
# `shared/responsiveImages.ts`.
#
# USAGE
#   scripts/ingest-images.sh <source-dir> <slug> <orientation>
#
#   <source-dir>   folder holding the original .jpg/.jpeg/.png files
#   <slug>         output basename, e.g. "project-boska-interior"
#   <orientation>  landscape | portrait | square
#
# EXAMPLE
#   scripts/ingest-images.sh ~/uploads/boska project-boska landscape
#
# WHY THIS EXISTS
#   The audit found the hero shipping a 391 KB 1920w WebP to phones. Every
#   image on the public site must exist at several widths so `srcSet` can hand
#   a 480w file to a phone instead. Doing that by hand is where mistakes creep
#   in, so it is scripted.
#
set -euo pipefail

SRC="${1:?source directory required}"
SLUG="${2:?slug required}"
ORIENTATION="${3:-landscape}"

OUT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/client/public/images"
mkdir -p "$OUT"

case "$ORIENTATION" in
  landscape) WIDTHS=(480 768 960 1200 1600) ;;
  portrait)  WIDTHS=(480 640 800 1000) ;;
  square)    WIDTHS=(480 768 1024) ;;
  *) echo "orientation must be landscape|portrait|square" >&2; exit 1 ;;
esac

# WebP quality 82 keeps photographic gradients (warm wood, LED glow, marble)
# clean while roughly halving JPEG weight. Renders tolerate it well too.
QUALITY=82

shopt -s nullglob nocaseglob
files=("$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png "$SRC"/*.webp)
shopt -u nocaseglob

if [ ${#files[@]} -eq 0 ]; then
  echo "No source images found in $SRC" >&2
  exit 1
fi

index=0
for f in "${files[@]}"; do
  index=$((index + 1))
  name="$(printf '%s-%02d' "$SLUG" "$index")"

  # `identify -format` emits no trailing newline, which makes `read` return
  # non-zero at EOF and would abort the script under `set -e`. The explicit \n
  # keeps both the assignment and the exit status well-behaved.
  read -r ow oh < <(identify -format '%w %h\n' "$f[0]")
  largest=0
  entries=""

  for w in "${WIDTHS[@]}"; do
    # Never upscale past the original.
    if [ "$w" -gt "$ow" ]; then continue; fi
    convert "$f[0]" \
      -auto-orient \
      -resize "${w}x" \
      -strip \
      -quality "$QUALITY" \
      -define webp:method=6 \
      "$OUT/${name}-${w}w.webp"
    entries="${entries}/images/${name}-${w}w.webp ${w}w, "
    largest="$w"
  done

  # Always emit a variant at the native width if it fell between buckets.
  if [ "$largest" -lt "$ow" ] && [ "$ow" -le 2000 ]; then
    convert "$f[0]" -auto-orient -strip -quality "$QUALITY" \
      -define webp:method=6 "$OUT/${name}-${ow}w.webp"
    entries="${entries}/images/${name}-${ow}w.webp ${ow}w, "
    largest="$ow"
  fi

  scaled_h=$(( oh * largest / ow ))
  entries="${entries%, }"

  cat <<TSENTRY
  "/images/${name}-${largest}w.webp": {
    width: ${largest},
    height: ${scaled_h},
    srcSet:
      "${entries}",
  },
TSENTRY
done

echo "" >&2
echo "Done. Files written to client/public/images/" >&2
echo "Paste the entries above into shared/responsiveImages.ts" >&2
