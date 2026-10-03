import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  OG_IMAGE_SIZE,
  ogCardChildren,
  ogCardRootStyle,
} from "@/lib/og-card";
import { getSeoPage } from "@/lib/seo-pages";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Params = Promise<{ seoSlug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { seoSlug } = await params;
  const page = getSeoPage(seoSlug);
  if (!page) notFound();

  return new ImageResponse(
    (
      <div style={ogCardRootStyle}>
        {ogCardChildren({
          kicker: page.eyebrow,
          title: page.title,
          description: page.description,
          footer: "sundeefundee.com",
        })}
      </div>
    ),
    size,
  );
}
