import { describe, expect, it } from "vitest";
import { siteOgImageUrl } from "./seo";
import { SITE_OG_IMAGE_PATH } from "./site";

describe("site constants", () => {
  it("points the shared OG image at a raster asset scrapers accept", () => {
    // Facebook, LinkedIn, and X reject SVG for og:image; this guards against
    // regressing to /og-image.svg.
    expect(SITE_OG_IMAGE_PATH.endsWith(".svg")).toBe(false);
  });

  it("builds an absolute site OG image URL", () => {
    expect(siteOgImageUrl()).toMatch(/^https:\/\/sundeefundee\.com\//);
    expect(siteOgImageUrl()).not.toContain(".svg");
  });
});
