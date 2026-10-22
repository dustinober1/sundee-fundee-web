import fs from "node:fs";
import path from "node:path";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { WeeklyPlanView } from "@/components/compound/WeeklyPlanView";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { COMPOUND_STRENGTH_HUB_PATH } from "@/lib/compound-strength";
import {
  getWeeklyWorkout,
  loadWeeklyWorkouts,
  pdfPathForWeek,
  weekDateRange,
} from "@/lib/compound-strength/weekly";

type Params = Promise<{ week: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return loadWeeklyWorkouts().map((workout) => ({ week: workout.weekId }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { week: weekId } = await params;
  const workout = getWeeklyWorkout(weekId);

  if (!workout) {
    return {};
  }

  return {
    title: `${workout.title} — Week of ${weekDateRange(workout.startDate)}`,
    description: workout.intro.slice(0, 160),
    alternates: {
      canonical: `${COMPOUND_STRENGTH_HUB_PATH}/archive/${weekId}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function WeeklyArchiveDetailPage({
  params,
}: {
  params: Params;
}) {
  const { week: weekId } = await params;
  const workout = getWeeklyWorkout(weekId);

  if (!workout) {
    notFound();
  }

  const pdfHref = pdfPathForWeek(workout.weekId);
  const hasPdf = fs.existsSync(path.join(process.cwd(), "public", pdfHref));

  return (
    <>
      <SiteHeader showHomeLink showDownloadButtons />

      <main className="flex flex-1 flex-col">
        <section className="px-6 pt-20 pb-12">
          <div className="mx-auto max-w-6xl">
            <Link
              href={`${COMPOUND_STRENGTH_HUB_PATH}/archive`}
              className="text-sm text-muted underline-offset-4 hover:underline"
            >
              ← All past weeks
            </Link>
            <p className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-orange">
              Archived week · {weekDateRange(workout.startDate)}
            </p>
            <h1 className="font-display mt-5 max-w-4xl text-5xl font-bold leading-[1.05] text-navy sm:text-6xl">
              {workout.title}
            </h1>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`${COMPOUND_STRENGTH_HUB_PATH}/this-week`}
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange px-8 py-3 font-medium text-cream transition hover:opacity-90"
              >
                See this week&apos;s workout
              </Link>
              {hasPdf ? (
                <a
                  href={pdfHref}
                  download
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface px-8 py-3 font-medium text-navy transition hover:border-orange/50"
                >
                  Download this week&apos;s PDF
                </a>
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
