import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppStoreButtons } from "@/components/AppStoreButtons";
import { WeekSchedule } from "@/components/compound/WeekSchedule";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildCompoundProgramJsonLd,
  buildFaqPageJsonLd,
  buildItemListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";
import { SITE_TITLE } from "@/lib/site";
import {
  COMPOUND_STRENGTH_HUB_PATH,
  compoundPrograms,
  getCompoundProgram,
} from "@/lib/compound-strength";

type Params = Promise<{ duration: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return compoundPrograms.map((program) => ({ duration: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { duration } = await params;
  const program = getCompoundProgram(duration);

  if (!program) {
    return {};
  }

  const canonicalPath = `${COMPOUND_STRENGTH_HUB_PATH}/${program.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  return {
    title: program.landingTitle,
    description: program.landingDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${program.landingTitle} | ${SITE_TITLE}`,
      description: program.landingDescription,
    },
    twitter: {
      card: "summary",
      title: `${program.landingTitle} | ${SITE_TITLE}`,
      description: program.landingDescription,
    },
  };
}

export default async function CompoundProgramPage({
  params,
}: {
  params: Params;
}) {
  const { duration } = await params;
  const program = getCompoundProgram(duration);

  if (!program) {
    notFound();
  }

  const canonicalPath = `${COMPOUND_STRENGTH_HUB_PATH}/${program.slug}`;
  const canonicalUrl = absoluteUrl(canonicalPath);

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
            { name: program.shortTitle, url: canonicalUrl },
          ]),
          buildWebPageJsonLd({
            name: program.landingTitle,
            description: program.landingDescription,
            url: canonicalUrl,
          }),
          buildCompoundProgramJsonLd({
            name: program.title,
            description: program.description,
            url: canonicalUrl,
          }),
          buildItemListJsonLd(
            `${program.shortTitle} weekly schedule`,
            program.week.map((day) => ({
              name: `${day.day}: ${day.focus}`,
              url: canonicalUrl,
              description:
                day.type === "training"
                  ? day.exercises.map((exercise) => exercise.name).join(", ")
                  : day.focus,
            })),
          ),
          buildFaqPageJsonLd(program.faqs),
        ]}
      />
      <SiteHeader showHomeLink showDownloadButtons />

      <main className="flex flex-1 flex-col">
        <section className="px-6 pt-20 pb-16">
          <div className="mx-auto max-w-6xl">
            <Link
              href={COMPOUND_STRENGTH_HUB_PATH}
              className="text-sm text-muted underline-offset-4 hover:underline"
            >
              ← All compound strength plans
            </Link>
            <p className="mt-10 text-sm font-medium uppercase tracking-[0.3em] text-orange">
              {program.minutesPerDay} minutes per day · {program.daysPerWeek}{" "}
              days per week
            </p>
            <h1 className="font-display mt-5 max-w-4xl text-5xl font-bold leading-[1.05] text-navy sm:text-6xl">
              {program.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium text-navy/80 italic">
              {program.tagline}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              {program.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                `${program.minutesPerDay} min/day`,
                `${program.daysPerWeek} days/week`,
                "4-week block",
                "Barbell + dumbbell paths",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#week-1"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange px-8 py-3 font-medium text-cream transition hover:opacity-90"
              >
                Start with week 1
              </a>
              <AppStoreButtons
                utmCampaign="compound_strength_plan"
                utmContent={program.slug}
                compact={false}
              />
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-cream p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                How sessions run
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {program.sessionStructure}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-cream p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                Equipment
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {program.equipmentNote}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-cream p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                How to progress
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {program.progressionRule}
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-3">
              {compoundPrograms.map((tier) => {
                const href = `${COMPOUND_STRENGTH_HUB_PATH}/${tier.slug}`;
                const isCurrent = tier.slug === program.slug;
                return (
                  <Link
                    key={tier.slug}
                    href={href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={[
                      "inline-flex h-12 items-center rounded-lg border px-6 font-medium transition",
                      isCurrent
                        ? "border-orange bg-orange text-cream"
                        : "border-border bg-surface text-navy hover:border-orange/50 hover:text-orange",
                    ].join(" ")}
                  >
                    {tier.shortTitle}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((week) => (
                <a
                  key={week}
                  href={`#week-${week}`}
                  className="inline-flex h-10 items-center rounded-full border border-border bg-surface px-5 text-sm font-medium text-navy transition hover:border-orange/50 hover:text-orange"
                >
                  Week {week}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-6xl space-y-20">
            {[1, 2, 3, 4].map((week) => (
              <WeekSchedule
                key={week}
                program={program}
                weekNumber={week}
              />
            ))}
          </div>
        </section>

        <section className="bg-surface px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-border bg-cream p-8">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
                Best fit
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy">
                Who this plan fits
              </h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-muted">
                {program.whoItFits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] border border-border bg-white p-8">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
                Use caution
              </p>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy">
                Who should skip it
              </h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-muted">
                {program.whoShouldSkip.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-navy" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
              FAQ
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
              Before you start.
            </h2>
            <div className="mt-10 grid gap-4">
              {program.faqs.map((item) => (
                <details
                  key={item.question}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <summary className="cursor-pointer font-display text-xl font-semibold text-navy">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
                Related links
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
                Keep planning from here.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {program.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[1.5rem] border border-border bg-surface p-6 transition hover:border-orange/50"
                >
                  <h3 className="font-display text-xl font-semibold text-navy">
                    {link.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-6 py-20 text-cream">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Next step
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">
              Run the block as written, then let the app adapt it.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-cream/80">
              The plan on this page stays fixed so you can follow it anywhere.
              In Sundee Fundee, the same training adapts around recovery,
              cycle context, pain flags, and substitutions after you log each
              session.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={COMPOUND_STRENGTH_HUB_PATH}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cream/20 px-8 py-3 font-medium text-cream transition hover:border-gold/70"
              >
                Compare all time options
              </Link>
              <AppStoreButtons
                utmCampaign="compound_strength_plan"
                utmContent={`${program.slug}_footer`}
                compact={false}
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
