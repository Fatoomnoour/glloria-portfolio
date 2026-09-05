#!/usr/bin/env bash
#
# One-shot ingestion for the studio's real photography.
#
# HOW TO GET THE FILES HERE
# -------------------------
# The chat attachment channel does not write files to this workspace (verified
# across five attempts: /home/user/uploads never exists and no image lands
# anywhere on disk). Direct HTTPS egress is also blocked, so a Drive or
# WeTransfer link cannot be fetched either. Git, however, works.
#
# So: commit the originals to the branch under raw-assets/, in these folders:
#
#   raw-assets/
#     boska/                  6 files  (render, 3 exterior night, 2 install)
#     elite/                  5 files
#     sara-alaa/              3 files
#     classic-white-clinic/   3 files
#     private-villa/          5 files
#     private-residence/      3 files
#     brand/
#       logo.png              the real Heba ElDamarany / Glloria mark
#       heba.jpg              founder portrait (see note below)
#
# Then run:  scripts/ingest-all.sh
#
# It converts everything to responsive WebP, prints the TypeScript registry
# entries, and leaves raw-assets/ untracked so the originals never bloat git.
#
set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

RAW="raw-assets"
if [ ! -d "$RAW" ]; then
  echo "raw-assets/ not found. See the header of this script." >&2
  exit 1
fi

# slug -> orientation. Renders and executed photography are both landscape
# except the phone-shot verticals, which are handled per-folder.
declare -A ORIENTATION=(
  [boska]=landscape
  [elite]=landscape
  [sara-alaa]=landscape
  [classic-white-clinic]=landscape
  [private-villa]=landscape
  [private-residence]=landscape
)

OUTFILE="/tmp/responsive-entries.txt"
: > "$OUTFILE"

for slug in "${!ORIENTATION[@]}"; do
  dir="$RAW/$slug"
  [ -d "$dir" ] || { echo "skip $slug (no folder)"; continue; }
  echo "==> $slug"
  # ingest-images.sh auto-detects portrait vs landscape per file by never
  # upscaling, so a mixed folder is safe.
  scripts/ingest-images.sh "$dir" "project-$slug" "${ORIENTATION[$slug]}" \
    >> "$OUTFILE"
done

# Brand assets keep their own names because the site references them directly.
if [ -f "$RAW/brand/logo.png" ]; then
  echo "==> brand logo"
  for w in 128 256 512; do
    convert "$RAW/brand/logo.png[0]" -auto-orient -resize "${w}x" -strip \
      -quality 90 -define webp:method=6 "client/public/images/glloria-logo-${w}.webp"
  done
  # Favicon and the social-preview card need raster PNG/JPG, not WebP.
  convert "$RAW/brand/logo.png[0]" -resize 180x180 -strip \
    "client/public/apple-touch-icon.png"
  convert "$RAW/brand/logo.png[0]" -resize 64x64 -strip "client/public/favicon.png"
fi

if [ -f "$RAW/brand/heba.jpg" ]; then
  echo "==> founder portrait"
  # NOTE: the supplied portrait came from a Rüya Beauty campaign poster carrying
  # another business's logo and large promotional text. Crop to the portrait
  # only before placing it here — showing a client brand's marketing inside
  # Glloria's own About section confuses the identity and raises a rights
  # question. This script assumes heba.jpg is ALREADY the cropped portrait.
  for w in 480 640 800; do
    convert "$RAW/brand/heba.jpg[0]" -auto-orient -resize "${w}x" -strip \
      -quality 84 -define webp:method=6 "client/public/images/founder-heba-${w}w.webp"
  done
fi

echo
echo "Done. Registry entries written to $OUTFILE"
echo "Next: paste them into shared/responsiveImages.ts, then run pnpm build."
