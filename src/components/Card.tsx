import type { ReactNode } from "react";

type ImageCardProps = { title: string; text?: string; src: string; alt: string; titleFirst?: boolean };

/** Soft rounded card with an image; `titleFirst` puts the heading above the image (home pillars). */
export function ImageCard({ title, text, src, alt, titleFirst }: ImageCardProps) {
  if (titleFirst) {
    return (
      <article className="card card-hover card-titled">
        <h3>{title}</h3>
        <div className="card-media">
          <img src={src} alt={alt} loading="lazy" width={900} height={720} />
        </div>
      </article>
    );
  }
  return (
    <article className="card card-hover">
      <div className="card-media">
        <img src={src} alt={alt} loading="lazy" width={1280} height={800} />
      </div>
      <div className="card-body">
        <h3 className="h-card">{title}</h3>
        {text && <p>{text}</p>}
      </div>
    </article>
  );
}

type IconCardProps = { icon: ReactNode; title: string; text: string; tone?: "blue" | "rose" };

export function IconCard({ icon, title, text, tone = "blue" }: IconCardProps) {
  return (
    <article className="card card-hover feature-tile">
      <span className={`icon-chip ${tone === "rose" ? "icon-chip-rose" : ""}`} aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
