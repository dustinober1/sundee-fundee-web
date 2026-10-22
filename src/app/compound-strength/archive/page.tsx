import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { COMPOUND_STRENGTH_HUB_PATH } from "@/lib/compound-strength";
import {
  getArchiveWeeks,
  weekDateRange,
} from "@/lib/compound-strength/weekly";
import { absoluteUrl, buildBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Weekly Workout Archive",
  description:
    "Every past weekly compound strength workout, kept readable after its week passes: full seven-day plans with barbell and dumbbell paths and coach notes.",
  alternates: {
    canonical: `${COMPOUND_STRENGTH_HUB_PATH}/archive`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WeeklyArchivePage() {
  const weeks = getArchiveWeeks();

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: "Home", url: absoluteUrl("/") },
            {
              name: "Compound Strength",
              url: absoluteUrl(COMPOUND_STRENGTH_HUB_PATH),
            },
            {
              name: "Archive",
              url: absoluteUrl(`${COMPOUND_STRENGTH_HUB_PATH}/archive`),
            },
          ]),
        ]}
      />
      <SiteHeader showHomeLink showDownloadButtons />

      <main className="flex flex-1 flex-col">
        <section className="px-6 pt-20 pb-16">
          <div className="mx-auto max-w-4xl">
            <Link
              href={`${COMPOUND_STRENGTH_HUB_PATH}/this-week`}
              className="text-sm text-muted underline-offset-4 hover:underline"
            >
              ← This week&apos;s workout
            </Link>
            <p className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-orange">
              Archive
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
              Past weekly workouts.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
              Every published week stays here after its week passes — still
              complete, still free to follow. This week&apos;s workout lives on its
              own page.
            </p>

            {weeks.length === 0 ? (
              <p className="mt-10 rounded-2xl border border-border bg-surface p-6 text-sm leading-7 text-muted">
                Nothing archived yet. The first weekly workout is still current
                — past weeks will collect here as new ones are published.
              </p>
            ) : (
              <ul className="mt-10 space-y-4">
                {weeks.map((week) => (
                  <li key={week.weekId}>
                    <Link
                      href={`${COMPOUND_STRENGTH_HUB_PATH}/archive/${week.weekId}`}
                      className="block rounded-2xl border border-border bg-surface p-6 transition hover:border-orange/50"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange">
                        {weekDateRange(week.startDate)} · {week.weekTheme}
                      </p>
                      <h2 className="font-display mt-2 text-2xl font-semibold text-navy">
                        {week.title}
                      </h2>
                      <p className="mt-2 text-sm leading-7 text-muted">
                        {week.intro}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
