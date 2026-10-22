import Link from "next/link";

import {
  COMPOUND_STRENGTH_HUB_PATH,
  getCompoundProgram,
} from "@/lib/compound-strength";
import type { WeeklyWorkout } from "@/lib/compound-strength/weekly";

type Props = {
  workout: WeeklyWorkout;
  pdfHref?: string;
};

const dayTypeStyles: Record<WeeklyWorkout["days"][number]["type"], string> = {
  training: "bg-surface border-border",
  "active-recovery": "bg-gold/10 border-gold/30",
  rest: "bg-navy/5 border-border",
};

export function WeeklyPlanView({ workout, pdfHref }: Props) {
  const featured = getCompoundProgram(workout.featuredTier);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy">
          Week theme: {workout.weekTheme}
        </span>
        <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-navy">
          Features the {featured?.shortTitle ?? workout.featuredTier} plan
        </span>
        {pdfHref ? (
          <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-orange">
            Printable PDF available
          </span>
        ) : null}
      </div>

      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
        {workout.intro}
      </p>

      {workout.coachNotes.length > 0 ? (
        <aside className="mt-8 max-w-3xl rounded-2xl border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            Coach notes for the week
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
            {workout.coachNotes.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <div className="mt-10 space-y-4">
        {workout.days.map((day) => (
          <article
            key={day.day}
            className={`rounded-2xl border p-6 ${dayTypeStyles[day.type]}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-xl font-semibold text-navy">
                {day.day}
              </h3>
              <p className="text-sm font-medium text-muted">{day.focus}</p>
            </div>

            {day.structure ? (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-orange">
                {day.structure}
              </p>
            ) : null}

            {day.exercises.length > 0 ? (
              <ol className="mt-4 divide-y divide-border/70">
                {day.exercises.map((exercise, index) => (
                  <li
                    key={`${day.day}-${exercise.name}`}
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy">
                        {exercise.pattern}
                      </span>
                      <p className="font-semibold text-navy">
                        {index + 1}. {exercise.name}
                      </p>
                    </div>
                    <div className="mt-2 grid gap-1.5 pl-0.5 sm:grid-cols-2">
                      <p className="text-sm leading-6 text-muted">
                        <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/70">
                          Barbell
                        </span>
                        {exercise.barbell}
                      </p>
                      <p className="text-sm leading-6 text-muted">
                        <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/70">
                          Dumbbell
                        </span>
                        {exercise.dumbbell}
                      </p>
                    </div>
                    {exercise.note ? (
                      <p className="mt-2 text-sm leading-6 text-muted/90 italic">
                        {exercise.note}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-border bg-surface p-8">
        <h3 className="font-display text-2xl font-bold text-navy">
          Want the full block?
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
          This week spotlights the {featured?.shortTitle ?? ""} tier. The
          complete four-week plan lives on its page — this week slots into it
          as a {workout.weekTheme.toLowerCase()} week.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {featured ? (
            <Link
              href={`${COMPOUND_STRENGTH_HUB_PATH}/${featured.slug}`}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-orange px-8 font-medium text-cream transition hover:opacity-90"
            >
              View the {featured.shortTitle.toLowerCase()} plan
            </Link>
          ) : null}
          <Link
            href={COMPOUND_STRENGTH_HUB_PATH}
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-cream px-8 font-medium text-navy transition hover:border-orange/50"
          >
            Compare all time options
          </Link>
        </div>
      </div>
    </div>
  );
}
