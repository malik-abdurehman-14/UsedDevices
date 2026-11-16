import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Photo } from "@/content/photos";

type Props = {
  photo: Photo;
  lang: Locale;
  sizes: string;
  className?: string;
  /** Extra classes for the <img>. */
  imgClassName?: string;
  preload?: boolean;
  /** Zoom slightly when an ancestor `.group` is hovered. */
  hoverZoom?: boolean;
};

/**
 * A framed product photo that fills its container.
 * Light/transparent-background shots sit on a soft white stage (contain);
 * scene photos are cropped to fill (cover).
 */
export function DevicePhoto({ photo, lang, sizes, className = "", imgClassName = "", preload, hoverZoom = true }: Props) {
  const zoom = hoverZoom ? "transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" : "";
  return (
    <div
      className={`relative overflow-hidden ${
        photo.light ? "bg-[radial-gradient(ellipse_at_center,#ffffff_0%,#f3efe6_100%)]" : "bg-ink-2"
      } ${className}`}
    >
      <Image
        src={photo.img}
        alt={photo.alt[lang]}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className={`${photo.light ? "object-contain p-[7%] mix-blend-multiply" : "object-cover"} ${zoom} ${imgClassName}`}
      />
    </div>
  );
}
