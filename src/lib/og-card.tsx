import type { CSSProperties, ReactNode } from "react";

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const ogCardRootStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "#fff8ed",
  color: "#12233a",
  padding: 72,
  fontFamily: "Arial, sans-serif",
};

export type OgCardInput = {
  kicker: string;
  title: string;
  description?: string;
  footer: string;
};

export function ogCardChildren({
  kicker,
  title,
  description,
  footer,
}: OgCardInput): ReactNode {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#f27319",
        }}
      >
        <span>Sundee Fundee</span>
        <span>{kicker}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 74,
            lineHeight: 1.02,
            fontWeight: 800,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 30,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#536174",
              maxWidth: 920,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          gap: 18,
          fontSize: 28,
          color: "#12233a",
        }}
      >
        <span>{footer}</span>
      </div>
    </>
  );
}
