# Weekly Compound Strength Workouts — automation contract

Everything an automation (skill, cron task, script) needs to publish a new
weekly workout. The site layer (pages, archive, sitemap) needs **no code
changes** — publishing a week is: add one JSON file, generate one PDF, open a
PR.

## 1. Post the week's data

Create `src/lib/compound-strength/weekly/<weekId>.json`, where `weekId` is
the ISO week of the **posting Monday**, lowercase: `2026-w44.json`.

```jsonc
{
  "weekId": "2026-w44",              // must equal the ISO week of startDate
  "startDate": "2026-10-26",         // must be that week's Monday (UTC)
  "title": "…",                      // headline, sentence case, no banned words
  "intro": "…",                      // 1–3 sentences shown at the top
  "featuredTier": "30-minutes",      // 15-minutes | 30-minutes | 1-hour | 2-hours
  "weekTheme": "Volume build",       // Technique base | Volume build | Intensity push | Deload (or custom)
  "coachNotes": ["…"],               // 1–5 short notes
  "days": [ /* exactly 7, Monday → Sunday */ ]
}
```

Day shape:

```jsonc
{
  "day": "Monday",
  "type": "training",                // training | active-recovery | rest
  "focus": "Lower body — squat emphasis",
  "structure": "Warm-up 5 min · Straight sets · Cooldown 5 min", // required on training days
  "exercises": [                     // training days: ≥2; rest/active days: omit
    {
      "pattern": "Squat",            // Squat | Hinge | Single-leg | Push | Pull | Carry | Core | Power | Conditioning
      "name": "Back squat / Goblet squat",
      "barbell": "4×8 @ RPE 7 · rest 2 min",   // concrete for THIS week, not a range
      "dumbbell": "4×10 · rest 90 sec",
      "note": "optional technique cue"
    }
  ]
}
```

Hard rules (the loader throws at build and vitest fails on violation):

- `weekId` matches `startDate`'s ISO week; `startDate` is a Monday; no
  duplicate `weekId`/`startDate` across files.
- All 7 days present, each exactly once.
- **Never use the word "functional"** (or "Functional Bodybuilding",
  "Filly", "Revival Strength") anywhere in the JSON — the banned-phrase
  check rejects the file. Say "compound lifts" / "movement patterns".
- Prescriptions are concrete (`4×8 @ RPE 7`), not ranges-to-interpret.

Validate locally:

```sh
npm run test            # includes src/lib/compound-strength-weekly.test.ts
```

## 2. Generate the printable PDF

```sh
.venv/bin/python scripts/generate_weekly_printable.py
```

Picks the latest week automatically (or pass a JSON path). Writes
`public/workout-plans/compound-strength-week-<weekId>.pdf`, which picks up
the site's existing `/workout-plans/*.pdf` cache header. The download button
on `/compound-strength/this-week` appears only when the file exists, so run
this **before** the PR. Pillow lives in the repo's `.venv`
(`python3 -m venv .venv && .venv/bin/pip install pillow` to recreate).

## 3. Ship it

```sh
git checkout -b weekly/2026-w44
git add src/lib/compound-strength/weekly/2026-w44.json \
        public/workout-plans/compound-strength-week-2026-w44.pdf
git commit -m "feat(compound-strength): publish week 2026-w44"
# run npm run test && npm run build, then open a PR and merge
```

## How the site behaves (no work needed)

- `/compound-strength/this-week` renders whichever posted week's
  Mon–Sun window contains the build date; if publishing lapses, it keeps
  showing the most recent week (labeled with its dates). The hub shows a
  gold banner linking to it while a current week exists.
- **Archiving is automatic.** When the next week's JSON lands, the previous
  week stops being "current" and appears in `/compound-strength/archive`
  (index, indexed) and stays reachable at
  `/compound-strength/archive/<weekId>` (noindexed, `dynamicParams=false`).
  Never delete posted JSON files — that 404s archived URLs.
- Sitemap: `this-week` and `archive` are listed; noindexed archive details
  are not.

## Reference files

- Loader + validation: `src/lib/compound-strength/weekly.ts`
- Seed example: `src/lib/compound-strength/weekly/2026-w43.json`
- Evergreen 4-week blocks (the core plans): `src/lib/compound-strength/`
