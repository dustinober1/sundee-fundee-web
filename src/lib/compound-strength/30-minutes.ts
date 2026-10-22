import type { CompoundProgram } from "./types";
import { steady } from "./types";

export const thirtyMinuteProgram: CompoundProgram = {
  slug: "30-minutes",
  title: "30-Minute Compound Strength Plan",
  shortTitle: "30 Minutes",
  minutesPerDay: 30,
  daysPerWeek: 4,
  tagline:
    "Straight sets on the big lifts, in and out of the gym in half an hour.",
  description:
    "A four-week compound strength block with four 30-minute sessions a week: a squat day, a hinge day, an upper push-and-pull day, and a full-body carry-and-conditioning day, each with barbell and dumbbell paths.",
  landingTitle: "30 Minute Compound Strength Plan | 4-Week Weekly Schedule",
  landingDescription:
    "Get a free 30 minute compound strength plan with four weekly sessions around squat, hinge, upper push-pull, and conditioning days, plus a four-week progression.",
  searchIntent:
    "Find a 30 minute compound strength plan with straight sets, clear weekly structure, and a four-week progression.",
  sessionStructure:
    "Sessions run 5 minutes of warm-up, three to four straight sets of each lift with 60–90 second rests, and 5 minutes of cooldown. Straight sets mean you finish one lift before starting the next — simple to follow, easy to log.",
  equipmentNote:
    "Every lift comes in two paths: a barbell version and a dumbbell version. Barbell paths progress in small plate jumps; dumbbell paths set up faster and work in a small space. Both paths share the same sets, reps, and weekly progression.",
  progressionRule:
    "Hold the rep range honest: when the top of the range feels smooth for two sessions, add 5 lb to upper-body lifts and 10 lb to lower-body lifts, or take the next dumbbell up. Week 3 adds a top set at RPE 8 with back-offs below it; week 4 cuts the volume roughly in half to deload.",
  weekThemes: ["Technique base", "Volume build", "Intensity push", "Deload"],
  week: [
    {
      day: "Monday",
      type: "training",
      focus: "Lower body — squat emphasis",
      structure: "Warm-up 5 min · Straight sets, top to bottom · Cooldown 5 min",
      exercises: [
        {
          pattern: "Squat",
          name: "Back squat / Goblet squat",
          barbell: [
            "4×6 @ RPE 6–7 · rest 2 min",
            "4×8 @ RPE 7 · rest 2 min",
            "Top set of 6 @ RPE 8, then 3×6 @ −10% · rest 2–3 min",
            "2×6 @ −20% · rest 90 sec",
          ],
          dumbbell: [
            "4×8–10 · rest 90 sec",
            "4×10 · rest 90 sec",
            "4×10, heavier bell · rest 2 min",
            "2×8, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Hinge",
          name: "Romanian deadlift / Dumbbell Romanian deadlift",
          barbell: steady("3×8 @ RPE 7 · rest 90 sec"),
          dumbbell: steady("3×10 · rest 90 sec"),
          note: "Hinge to a stretch you control — the weights drift toward the floor as your hips travel back, not as your spine rounds.",
        },
        {
          pattern: "Single-leg",
          name: "Rear-foot-elevated split squat / Dumbbell rear-foot-elevated split squat",
          barbell: steady("3×8/leg · rest 90 sec"),
          dumbbell: steady("3×8/leg · rest 90 sec"),
          note: "Rear foot on a bench. Start with bodyweight or light bells and earn range before load.",
        },
        {
          pattern: "Carry",
          name: "Front-rack carry / Farmer carry",
          barbell: steady("3×30 sec · rest 75 sec"),
          dumbbell: steady("3×40 yd · rest 75 sec"),
        },
        {
          pattern: "Core",
          name: "Dead bug / Pallof press",
          barbell: steady("3×8/side · rest 45 sec"),
          dumbbell: steady("3×8/side · rest 45 sec"),
        },
      ],
    },
    {
      day: "Tuesday",
      type: "training",
      focus: "Upper body — push and pull",
      structure: "Warm-up 5 min · Straight sets, top to bottom · Cooldown 5 min",
      exercises: [
        {
          pattern: "Push",
          name: "Bench press / Dumbbell bench press",
          barbell: [
            "4×6 @ RPE 6–7 · rest 2 min",
            "4×8 @ RPE 7 · rest 2 min",
            "Top set of 6 @ RPE 8, then 3×6 @ −10% · rest 2–3 min",
            "2×6 @ −20% · rest 90 sec",
          ],
          dumbbell: [
            "4×8–10 · rest 90 sec",
            "4×10 · rest 90 sec",
            "4×10, heavier bells · rest 2 min",
            "2×8, lighter bells · rest 90 sec",
          ],
        },
        {
          pattern: "Pull",
          name: "Bent-over row / One-arm row",
          barbell: [
            "4×6 @ RPE 6–7 · rest 2 min",
            "4×8 @ RPE 7 · rest 2 min",
            "Top set of 8 @ RPE 8, then 3×8 @ −10% · rest 2 min",
            "2×8 @ −20% · rest 90 sec",
          ],
          dumbbell: [
            "4×10/side · rest 75 sec",
            "4×10/side, heavier bell · rest 75 sec",
            "4×10/side, heavier bell again · rest 90 sec",
            "2×10/side, lighter bell · rest 75 sec",
          ],
        },
        {
          pattern: "Push",
          name: "Overhead press / Half-kneeling one-arm press",
          barbell: steady("3×6–8 @ RPE 7 · rest 90 sec"),
          dumbbell: steady("3×8/side · rest 75 sec"),
        },
        {
          pattern: "Pull",
          name: "Inverted row / Chest-supported row",
          barbell: steady("3×8–12 · rest 75 sec"),
          dumbbell: steady("3×10/side · rest 75 sec"),
          note: "Inverted row path: set a bar in the rack at hip height and row your chest to it. The lower the bar, the harder it gets.",
        },
        {
          pattern: "Core",
          name: "Plank / Suitcase hold",
          barbell: steady("3×30–40 sec · rest 45 sec"),
          dumbbell: steady("3×30 sec/side · rest 45 sec"),
        },
      ],
    },
    {
      day: "Wednesday",
      type: "active-recovery",
      focus: "25–40 minute walk + 5 minutes of hip, ankle, and shoulder mobility",
      exercises: [],
    },
    {
      day: "Thursday",
      type: "training",
      focus: "Lower body — hinge emphasis",
      structure: "Warm-up 5 min · Straight sets, top to bottom · Cooldown 5 min",
      exercises: [
        {
          pattern: "Hinge",
          name: "Deadlift / Dumbbell deadlift",
          barbell: [
            "4×5 @ RPE 6–7 · rest 2–3 min",
            "4×6 @ RPE 7 · rest 2–3 min",
            "Top set of 5 @ RPE 8, then 3×5 @ −10% · rest 3 min",
            "2×5 @ −20% · rest 2 min",
          ],
          dumbbell: [
            "4×8 · rest 2 min",
            "4×8, heavier bells · rest 2 min",
            "4×8, heavier bells again · rest 2 min",
            "2×8, lighter bells · rest 90 sec",
          ],
          note: "Reset your brace and setup on every rep of the barbell path — deadlifts are five singles strung together, not one 20-rep set.",
        },
        {
          pattern: "Hinge",
          name: "Barbell hip thrust / Dumbbell hip thrust",
          barbell: steady("3×10 @ RPE 7 · rest 90 sec"),
          dumbbell: steady("3×12 · rest 90 sec"),
        },
        {
          pattern: "Single-leg",
          name: "Single-leg Romanian deadlift / Same, dumbbell",
          barbell: steady("3×8/leg · rest 75 sec"),
          dumbbell: steady("3×8/leg · rest 75 sec"),
          note: "Hold a plate or a light bell. Move slow enough that your balance, not your grip, is the limiter.",
        },
        {
          pattern: "Carry",
          name: "Suitcase carry / Same, dumbbell",
          barbell: steady("3×30 sec/side · rest 75 sec"),
          dumbbell: steady("3×40 yd/side · rest 75 sec"),
          note: "One heavy implement on one side. Stand tall and refuse to tip — this is anti-lateral-flexion training disguised as a walk.",
        },
        {
          pattern: "Core",
          name: "Pallof press / Dead bug",
          barbell: steady("3×10/side · rest 45 sec"),
          dumbbell: steady("3×10/side · rest 45 sec"),
        },
      ],
    },
    {
      day: "Friday",
      type: "training",
      focus: "Full body + conditioning",
      structure:
        "Warm-up 5 min · Straight sets, then the finisher circuit · Cooldown 5 min",
      exercises: [
        {
          pattern: "Push",
          name: "Push press / Dumbbell thruster",
          barbell: [
            "4×5 @ RPE 6–7 · rest 2 min",
            "4×6 @ RPE 7 · rest 2 min",
            "4×6, add 5 lb · rest 2 min",
            "2×5, −20% load · rest 90 sec",
          ],
          dumbbell: [
            "4×8 · rest 90 sec",
            "4×8, heavier bells · rest 90 sec",
            "4×8, heavier bells again · rest 90 sec",
            "2×8, lighter bells · rest 90 sec",
          ],
        },
        {
          pattern: "Squat",
          name: "Front squat / Goblet squat",
          barbell: steady("3×6 @ RPE 7 · rest 2 min"),
          dumbbell: steady("3×10 · rest 90 sec"),
        },
        {
          pattern: "Pull",
          name: "Chest-supported row / Chest-supported dumbbell row",
          barbell: steady("3×10 · rest 90 sec"),
          dumbbell: steady("3×10/side · rest 75 sec"),
        },
        {
          pattern: "Carry",
          name: "Farmer carry / Same, dumbbell",
          barbell: steady("3×30 sec · rest 90 sec"),
          dumbbell: steady("3×40 yd · rest 90 sec"),
        },
        {
          pattern: "Conditioning",
          name: "Finishing circuit — thrusters + swings",
          barbell: [
            "6 min: 30 sec work / 30 sec rest",
            "8 min: 30 sec work / 30 sec rest",
            "8 min: 40 sec work / 20 sec rest",
            "5 min easy: 30 sec work / 30 sec rest",
          ],
          dumbbell: [
            "6 min: 30 sec work / 30 sec rest",
            "8 min: 30 sec work / 30 sec rest",
            "8 min: 40 sec work / 20 sec rest",
            "5 min easy: 30 sec work / 30 sec rest",
          ],
          note: "Alternate thrusters and dumbbell swings on the work intervals. Cap every interval at a pace you could hold for double the time.",
        },
      ],
    },
    {
      day: "Saturday",
      type: "active-recovery",
      focus: "Easy 30-minute walk, hike, or bike ride",
      exercises: [],
    },
    {
      day: "Sunday",
      type: "rest",
      focus: "Full rest. Sleep in, eat well, and let the week settle.",
      exercises: [],
    },
  ],
  whoItFits: [
    "Lifters past the beginner stage who want structured straight sets but cannot give up an hour.",
    "People who train on a lunch break or before work and need a hard stop at 30 minutes.",
    "Anyone who wants a squat day, a hinge day, an upper day, and a conditioning day without designing it themselves.",
  ],
  whoShouldSkip: [
    "Anyone with active pain that changes how they squat, hinge, press, or carry — sort that out first.",
    "Lifters who need maximum-strength peaking on the competition lifts; the rest windows here are built for busy days, not record attempts.",
  ],
  faqs: [
    {
      question: "Is 30 minutes enough to build muscle and strength?",
      answer:
        "For most people, yes. Four focused 30-minute sessions a week deliver plenty of quality compound volume, especially with honest effort on the main lifts. The limiting factor is usually consistency, and 30-minute sessions are the easiest kind to keep.",
    },
    {
      question: "Why straight sets instead of circuits?",
      answer:
        "Straight sets keep every set of a lift at full quality and make progress easy to see in a log. The only circuit-style work is the short Friday finisher, where the goal is conditioning rather than strength.",
    },
    {
      question: "What weights should I start with?",
      answer:
        "Pick loads that let you finish every set with two or three reps left in week 1. The plan gets heavy in week 3; loads that start too heavy are what make week 3 fall apart.",
    },
    {
      question: "Can I add cardio on top of this plan?",
      answer:
        "Yes. The two active-recovery days are the natural slot for easy cardio, and the Friday finisher already covers short intervals. Keep hard cardio away from the squat and deadlift days when you can.",
    },
    {
      question: "How is this different from the 15-minute plan?",
      answer:
        "More exercises per session, full rest periods instead of supersets, and a heavier week-3 intensity push. The 15-minute plan compresses the same movement patterns; this tier lets each lift breathe.",
    },
  ],
  relatedLinks: [
    {
      href: "/compound-strength/1-hour",
      label: "1-hour compound strength plan",
      description:
        "When your schedule opens up, this tier adds a fifth training day and fuller accessory work.",
    },
    {
      href: "/compound-strength/15-minutes",
      label: "15-minute compound strength plan",
      description:
        "The same movement patterns compressed into supersets for the busiest weeks.",
    },
    {
      href: "/workout-plans",
      label: "Printable workout plans",
      description:
        "Multi-week PDF blocks with log sheets if you want a plan you can carry on paper.",
    },
    {
      href: "/tools/rpe-rir-chart",
      label: "RPE and RIR chart",
      description:
        "How to judge RPE 6 through 8 without a coach watching every set.",
    },
  ],
};
