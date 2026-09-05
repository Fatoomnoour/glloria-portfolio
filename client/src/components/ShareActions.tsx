/* Glloria Design Direction: Warm Editorial Atelier — sharing is a quiet archive utility, never a loud social toolbar. */
import { useState } from "react";
import { Check, Copy, Facebook, Share2 } from "lucide-react";

export default function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    if (navigator.clipboard) await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: `شاهد مشروع ${title} من Glloria`,
        url: shareUrl,
      });
    } else {
      await copyLink();
    }
  };

  return (
    <div className="share-actions" aria-label="مشاركة المشروع">
      <span className="share-label">
        <Share2 size={14} aria-hidden="true" /> مشاركة المشروع
      </span>
      <button type="button" onClick={nativeShare} aria-label="مشاركة">
        <Share2 size={15} aria-hidden="true" />
        <span>مشاركة</span>
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
      >
        <Facebook size={15} aria-hidden="true" />
        <span>Facebook</span>
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <span className="whatsapp-glyph" aria-hidden="true">
          W
        </span>
        <span>WhatsApp</span>
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "تم النسخ" : "نسخ الرابط"}
      >
        {copied ? (
          <Check size={15} aria-hidden="true" />
        ) : (
          <Copy size={15} aria-hidden="true" />
        )}
        <span>{copied ? "تم النسخ" : "نسخ الرابط"}</span>
      </button>
    </div>
  );
}
