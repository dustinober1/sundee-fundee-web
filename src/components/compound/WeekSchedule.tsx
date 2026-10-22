import type { CompoundDay, CompoundProgram } from "@/lib/compound-strength";

type Props = {
  program: CompoundProgram;
  weekNumber: number; // 1–4
};

const dayTypeStyles: Record<CompoundDay["type"], string> = {
  training: "bg-surface border-border",
  "active-recovery": "bg-gold/10 border-gold/30",
  rest: "bg-navy/5 border-border",
};

export function WeekSchedule({ program, weekNumber }: Props) {
  const weekIndex = weekNumber - 1;
  const theme = program.weekThemes[weekIndex];

  return (
    <section id={`week-${weekNumber}`} className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Week {weekNumber}
          <span className="text-orange"> — {theme}</span>
        </h3>
        <p className="text-sm text-muted">
          Same seven days every week of the block; prescriptions change.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {program.week.map((day) => (
          <article
            key={day.day}
            className={`rounded-2xl border p-6 ${dayTypeStyles[day.type]}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h4 className="font-display text-xl font-semibold text-navy">
                {day.day}
              </h4>
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
                  <li key={`${day.day}-${exercise.name}`} className="py-4 first:pt-0 last:pb-0">
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
                        {exercise.barbell[weekIndex]}
                      </p>
                      <p className="text-sm leading-6 text-muted">
                        <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/70">
                          Dumbbell
                        </span>
                        {exercise.dumbbell[weekIndex]}
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
    </section>
  );
}
