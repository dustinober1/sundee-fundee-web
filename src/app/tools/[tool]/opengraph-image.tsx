import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  OG_IMAGE_SIZE,
  ogCardChildren,
  ogCardRootStyle,
} from "@/lib/og-card";
import { getTrainingTool } from "@/lib/training-tools";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Params = Promise<{ tool: string }>;

export default async function Image({ params }: { params: Params }) {
  const { tool: toolSlug } = await params;
  const tool = getTrainingTool(toolSlug);
  if (!tool) notFound();

  return new ImageResponse(
    (
      <div style={ogCardRootStyle}>
        {ogCardChildren({
          kicker: "Free training tool",
          title: tool.title,
          description: tool.description,
          footer: "sundeefundee.com",
        })}
      </div>
    ),
    size,
  );
}
