import Link from "next/link";
import type { Metadata } from "next";
import { AppStoreButtons } from "@/components/AppStoreButtons";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildCompoundProgramJsonLd,
  buildFaqPageJsonLd,
  buildItemListJsonLd,
} from "@/lib/seo";
import {
  COMPOUND_STRENGTH_HUB_PATH,
  compoundPrograms,
} from "@/lib/compound-strength";
import { resolveCurrentWeek, weekDateRange } from "@/lib/compound-strength/weekly";

export const metadata: Metadata = {
  title: "Compound Strength Weekly Plans by Time",
  description:
    "Four-week compound strength plans for 15 minutes, 30 minutes, 1 hour, or 2 hours a day, with barbell and dumbbell paths for every lift.",
  alternates: {
    canonical: COMPOUND_STRENGTH_HUB_PATH,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: COMPOUND_STRENGTH_HUB_PATH,
    title: "Compound Strength Weekly Plans by Time",
    description:
      "Pick the time you actually have and follow a full four-week compound lifting block.",
  },
};

const tierFocus: Record<string, string> = {
  "15-minutes": "Superset circuits, minimal rest",
  "30-minutes": "Straight sets, four days a week",
  "1-hour": "Five-day lower/upper/hinge/pull split",
  "2-hours": "Full sessions: top sets, accessories, conditioning",
};

const weekBlocks = [
  {
    theme: "Technique base",
    body: "Week 1 runs every lift at RPE 6–7 with two or three reps left in the tank, so positions and weights get set honestly.",
  },
  {
    theme: "Volume build",
    body: "Week 2 adds reps or rounds on the main lifts while accessories hold steady. Loads only move when every set stays clean.",
  },
  {
    theme: "Intensity push",
    body: "Week 3 is the hardest week: longer prescriptions, heavier loads, and in the longer tiers a true top set at RPE 8 with back-offs below it.",
  },
  {
    theme: "Deload",
    body: "Week 4 cuts the volume sharply so the next block starts from recovery instead of fatigue. It is part of the plan, not a break from it.",
  },
];

const faqItems = [
  {
    question: "What does compound strength training mean?",
    answer:
      "It means the week is built on multi-joint lifts — squats, hinges, presses, rows, single-leg work, carries, and core — the movements that carry over to daily life and to every other lift, instead of isolated machine work.",
  },
  {
    question: "Which time option should I pick?",
    answer:
      "Pick the one that fits your worst realistic day, not your best one. Four honest 15-minute sessions beat two skipped hour-long ones. You can always move up a tier at the end of a four-week block.",
  },
  {
    question: "Do I need both a barbell and dumbbells?",
    answer:
      "No. Every lift in every plan has a barbell path and a dumbbell path, and you can run the whole block on either. Most people pick one path per lift and stay with it so progress is easy to track.",
  },
  {
    question: "Are the plans free?",
    answer:
      "Yes. Every tier is free to follow from the page, with no paywall. The Sundee Fundee app adds adaptive logging and coaching when you want recovery, cycle, and pain context layered on top.",
  },
  {
    question: "Can I switch time options mid-block?",
    answer:
      "Finish the current week first, then switch at a week boundary. The four tiers share the same movement patterns and weekly themes, so a switch lands on its feet.",
  },
];

export default function CompoundStrengthPage() {
  const currentWeek = resolveCurrentWeek();

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
          ]),
          buildItemListJsonLd(
            "Compound Strength Weekly Plans",
            compoundPrograms.map((program) => ({
              name: program.title,
              url: absoluteUrl(`${COMPOUND_STRENGTH_HUB_PATH}/${program.slug}`),
              description: program.description,
            })),
          ),
          buildFaqPageJsonLd(faqItems),
          ...compoundPrograms.map((program) =>
            buildCompoundProgramJsonLd({
              name: program.title,
              description: program.description,
              url: absoluteUrl(
                `${COMPOUND_STRENGTH_HUB_PATH}/${program.slug}`,
              ),
            }),
          ),
        ]}
      />
      <SiteHeader showHomeLink showDownloadButtons />

      <main className="flex flex-1 flex-col">
        <section className="px-6 pt-20 pb-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
              Compound strength weekly plans
            </p>
            <h1 className="font-display mt-5 max-w-4xl text-5xl font-bold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
              Pick the time you have. We built the week.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Four complete four-week training blocks — 15 minutes, 30 minutes,
              1 hour, or 2 hours per day — all built on the same compound
              movement patterns: squat, hinge, press, pull, single-leg work,
              carries, and core. Every lift has a barbell and a dumbbell path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tiers"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-orange px-8 font-medium text-cream transition hover:opacity-90"
              >
                Choose your time
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-8 font-medium text-navy transition hover:border-orange/50"
              >
                How the block works
              </a>
            </div>
            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                ["4", "time options"],
                ["4 weeks", "per block"],
                ["2", "equipment paths"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-surface p-5"
                >
                  <p className="font-mono text-2xl font-semibold text-navy">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {currentWeek ? (
          <section className="border-y border-border bg-gold/10 px-6 py-10">
            <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                  New · Week of {weekDateRange(currentWeek.startDate)}
                </p>
                <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-3xl">
                  {currentWeek.title}
                </h2>
              </div>
              <Link
                href={`${COMPOUND_STRENGTH_HUB_PATH}/this-week`}
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-orange px-8 font-medium text-cream transition hover:opacity-90"
              >
                See this week&apos;s workout
              </Link>
            </div>
          </section>
        ) : null}

        <section id="tiers" className="bg-surface px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
                  Choose your time
                </p>
                <h2 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
                  Same patterns. Different clocks.
                </h2>
              </div>
              <p className="max-w-xl text-muted">
                Every tier covers all seven movement patterns each week and
                follows the same four-week wave. The difference is session
                density: shorter tiers compress with supersets, longer tiers
                add straight sets, accessories, and conditioning.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {compoundPrograms.map((program) => (
                <article
                  key={program.slug}
                  className="flex flex-col rounded-[2rem] border border-border bg-cream p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
                      {program.minutesPerDay} minutes per day
                    </p>
                    <p className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy">
                      {program.daysPerWeek} days/week
                    </p>
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-semibold text-navy">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-muted italic">
                    {program.tagline}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                    {program.description}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-navy/70">
                    {tierFocus[program.slug]}
                  </p>
                  <Link
                    href={`${COMPOUND_STRENGTH_HUB_PATH}/${program.slug}`}
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-orange px-6 font-medium text-cream transition hover:opacity-90"
                  >
                    View the {program.shortTitle.toLowerCase()} plan
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
                How the block works
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
                Four weeks, one wave.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted">
                All four tiers follow the same shape: build, push, and back
                off. Week to week the seven days stay the same — the sets,
                reps, and loads change.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {weekBlocks.map((block, index) => (
                <div
                  key={block.theme}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <p className="font-mono text-sm font-semibold text-orange">
                    Week {index + 1}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold text-navy">
                    {block.theme}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy px-6 py-24 text-cream">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
                  Equipment
                </p>
                <h2 className="font-display mt-4 text-4xl font-bold sm:text-5xl">
                  Barbell or dumbbell. Both work.
                </h2>
              </div>
              <p className="max-w-xl text-cream/80">
                Every exercise in every tier lists both paths side by side, so
                the plan survives a busy gym, a hotel, or a garage setup.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
                <h3 className="font-display text-xl font-semibold text-cream">
                  The barbell path
                </h3>
                <p className="mt-3 text-sm leading-7 text-cream/80">
                  Small plate jumps, heavy top sets, and the fastest route to
                  max strength on squats, deadlifts, presses, and rows. Best
                  when you have a rack and unracked time.
                </p>
              </div>
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-6">
                <h3 className="font-display text-xl font-semibold text-cream">
                  The dumbbell path
                </h3>
                <p className="mt-3 text-sm leading-7 text-cream/80">
                  Faster setup, less space, more single-arm and single-leg
                  work. Loads climb in bigger jumps, so reps lead and weight
                  follows. Best for home gyms and crowded floors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
                Questions
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
                Before week 1.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <h3 className="font-display text-2xl font-semibold text-navy">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange">
              Next step
            </p>
            <h2 className="font-display mt-4 text-4xl font-bold text-navy sm:text-5xl">
              Follow the plan on the page. Add coaching when you want it.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted">
              These blocks are fixed and free. The Sundee Fundee app is where
              the same lifts adapt around recovery, cycle phase, pain, and
              injuries once you log your sessions.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/workout-plans"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-cream px-8 font-medium text-navy transition hover:border-orange/50"
              >
                Browse printable PDF plans
              </Link>
              <AppStoreButtons utmCampaign="compound_strength_hub" utmContent="hub_footer" compact={false} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
