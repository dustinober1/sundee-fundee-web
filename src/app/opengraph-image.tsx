import { ImageResponse } from "next/og";
import {
  OG_IMAGE_SIZE,
  ogCardChildren,
  ogCardRootStyle,
} from "@/lib/og-card";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = `${SITE_TITLE} — recovery-aware strength training on iOS`;

export default function Image() {
  return new ImageResponse(
    (
      <div style={ogCardRootStyle}>
        {ogCardChildren({
          kicker: "sundeefundee.com",
          title: SITE_TITLE,
          description: SITE_DESCRIPTION,
          footer: "Recovery-aware strength training",
        })}
      </div>
    ),
    size,
  );
}
