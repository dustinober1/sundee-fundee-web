import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  OG_IMAGE_SIZE,
  ogCardChildren,
  ogCardRootStyle,
} from "@/lib/og-card";
import { getTopicHub } from "@/lib/topic-hubs";
import { BLOG_TOPICS, getBlogTopic, type BlogTopicSlug } from "../../taxonomy";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";

type Params = Promise<{ topic: string }>;

function isBlogTopicSlug(value: string): value is BlogTopicSlug {
  return BLOG_TOPICS.some((topic) => topic.slug === value);
}

export default async function Image({ params }: { params: Params }) {
  const { topic: topicParam } = await params;
  if (!isBlogTopicSlug(topicParam)) notFound();

  const topic = getBlogTopic(topicParam);
  const hub = getTopicHub(topic.slug);

  return new ImageResponse(
    (
      <div style={ogCardRootStyle}>
        {ogCardChildren({
          kicker: topic.label,
          title: hub.title,
          description: hub.metaDescription,
          footer: "sundeefundee.com",
        })}
      </div>
    ),
    size,
  );
}
