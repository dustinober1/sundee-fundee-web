import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getPost } from "../posts";
import { getPrimaryTopic } from "../taxonomy";
import {
  OG_IMAGE_SIZE,
  ogCardChildren,
  ogCardRootStyle,
} from "@/lib/og-card";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const topic = getPrimaryTopic(post);

  return new ImageResponse(
    (
      <div style={ogCardRootStyle}>
        {ogCardChildren({
          kicker: topic.label,
          title: post.title,
          description: post.description,
          footer: `${post.readMinutes} min read • Recovery-aware strength training`,
        })}
      </div>
    ),
    size,
  );
}
