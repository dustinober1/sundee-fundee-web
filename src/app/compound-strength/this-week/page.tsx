import fs from "node:fs";
import path from "node:path";

import Link from "next/link";
import type { Metadata } from "next";

import { WeeklyPlanView } from "@/components/compound/WeeklyPlanView";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { COMPOUND_STRENGTH_HUB_PATH } from "@/lib/compound-strength";
import {
  getArchiveWeeks,
  pdfPathForWeek,
  resolveCurrentWeek,
  weekDateRange,
} from "@/lib/compound-strength/weekly";
import { absoluteUrl, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "This Week's Compound Strength Workout",
  description:
    "This week&apos;s compound strength workout of the week: a fresh seven-day plan with barbell and dumbbell paths, coach notes, and a printable PDF, from Sundee Fundee.",
  alternates: {
    canonical: `${COMPOUND_STRENGTH_HUB_PATH}/this-week`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

function pdfExists(href: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", href));
}

export default function ThisWeekPage() {
  const workout = resolveCurrentWeek();
  const archiveWeeks = getArchiveWeeks();

  if (!workout) {
    return (
      <>
        <SiteHeader showHomeLink showDownloadButtons />
        <main className="flex flex-1 flex-col px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
              This week
            </p>
            <h1 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
              No weekly workout posted yet.
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted">
              The first weekly workout has not been published. In the
              meantime, the full four-week compound strength plans are
              complete on their own — pick your time and start today.
            </p>
            <Link
              href={COMPOUND_STRENGTH_HUB_PATH}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-orange px-8 font-medium text-cream transition hover:opacity-90"
            >
              Browse the weekly plans
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const pdfHref = pdfPathForWeek(workout.weekId);
  const hasPdf = pdfExists(pdfHref);
  const canonicalPath = `${COMPOUND_STRENGTH_HUB_PATH}/this-week`;

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
            { name: "This Week", url: absoluteUrl(canonicalPath) },
          ]),
          buildWebPageJsonLd({
            name: workout.title,
            description: workout.intro,
            url: absoluteUrl(canonicalPath),
          }),
        ]}
      />
      <SiteHeader showHomeLink showDownloadButtons />

      <main className="flex flex-1 flex-col">
        <section className="px-6 pt-20 pb-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
              This week · {weekDateRange(workout.startDate)}
            </p>
            <h1 className="font-display mt-5 max-w-4xl text-5xl font-bold leading-[1.05] text-navy sm:text-6xl">
              {workout.title}
            </h1>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {hasPdf ? (
                <a
                  href={pdfHref}
                  download
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange px-8 py-3 font-medium text-cream transition hover:opacity-90"
                >
                  Download this week&apos;s PDF
                </a>
              ) : null}
              {archiveWeeks.length > 0 ? (
                <Link
                  href={`${COMPOUND_STRENGTH_HUB_PATH}/archive`}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-8 py-3 font-medium text-navy transition hover:border-orange/50"
                >
                  Past weeks ({archiveWeeks.length})
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl">
            <WeeklyPlanView workout={workout} pdfHref={hasPdf ? pdfHref : undefined} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
