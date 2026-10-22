import type { CompoundProgram } from "./types";
import { steady } from "./types";

export const oneHourProgram: CompoundProgram = {
  slug: "1-hour",
  title: "1-Hour Compound Strength Plan",
  shortTitle: "1 Hour",
  minutesPerDay: 60,
  daysPerWeek: 5,
  tagline: "A full training week: lower, upper, hinge, pull, and a conditioning day.",
  description:
    "A four-week compound strength block with five hour-long sessions a week — lower-squat, upper-push, lower-hinge, upper-pull, and a full-body conditioning day — with barbell and dumbbell paths for every lift.",
  landingTitle: "1 Hour Compound Strength Plan | 5-Day Weekly Schedule",
  landingDescription:
    "Follow a free 1 hour compound strength plan with five weekly sessions of squats, deadlifts, presses, rows, and carries, plus a four-week progression and accessory work.",
  searchIntent:
    "Find a 1 hour compound strength plan with a five-day weekly schedule, main and accessory lifts, and a four-week progression.",
  sessionStructure:
    "Each session runs a 10-minute warm-up, a main lift for four work sets, a secondary lift for three, then accessories and a carry or core finisher, with 5 minutes of cooldown. Rest runs 2–3 minutes on main lifts and 60–90 seconds on everything else.",
  equipmentNote:
    "Every lift comes in two paths: a barbell version and a dumbbell version. Barbell paths are the direct route for the big lifts; dumbbell paths cover small gyms and home setups. Both paths share the same sets, reps, and weekly progression.",
  progressionRule:
    "Progress the main and secondary lifts by the week as written; hold accessories steady and let them get harder through load alone. When an accessory finishes smooth two sessions in a row, take the next dumbbell up or add 5 lb to the bar. Week 4 keeps the main lifts light and cuts accessories to two sets.",
  weekThemes: ["Technique base", "Volume build", "Intensity push", "Deload"],
  week: [
    {
      day: "Monday",
      type: "training",
      focus: "Lower body — squat emphasis",
      structure: "Warm-up 10 min · Main → secondary → accessories · Cooldown 5 min",
      exercises: [
        {
          pattern: "Squat",
          name: "Back squat / Goblet squat to heavy front squat",
          barbell: [
            "4×5 @ RPE 6–7 · rest 2–3 min",
            "4×6 @ RPE 7 · rest 2–3 min",
            "Top set of 5 @ RPE 8, then 3×5 @ −10% · rest 3 min",
            "3×5 @ −20% · rest 2 min",
          ],
          dumbbell: [
            "4×8 heavy goblet squats · rest 2 min",
            "4×10 heavy goblet squats · rest 2 min",
            "4×10, heavier bell · rest 2 min",
            "3×8, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Hinge",
          name: "Romanian deadlift / Dumbbell Romanian deadlift",
          barbell: [
            "3×8 @ RPE 6–7 · rest 2 min",
            "3×10 @ RPE 7 · rest 2 min",
            "3×8, add 10 lb · rest 2 min",
            "2×8, −20% load · rest 90 sec",
          ],
          dumbbell: [
            "3×10 · rest 90 sec",
            "3×12 · rest 90 sec",
            "3×10, heavier bells · rest 90 sec",
            "2×10, lighter bells · rest 90 sec",
          ],
        },
        {
          pattern: "Single-leg",
          name: "Bulgarian split squat / Dumbbell Bulgarian split squat",
          barbell: steady("3×8/leg · rest 90 sec"),
          dumbbell: steady("3×10/leg · rest 90 sec"),
        },
        {
          pattern: "Squat",
          name: "Walking lunge / Dumbbell walking lunge",
          barbell: steady("2×10 steps/leg · rest 90 sec"),
          dumbbell: steady("2×12 steps/leg · rest 90 sec"),
        },
        {
          pattern: "Core",
          name: "Barbell rollout / Weighted dead bug",
          barbell: steady("3×10 · rest 60 sec"),
          dumbbell: steady("3×10/side · rest 60 sec"),
        },
        {
          pattern: "Carry",
          name: "Front-rack carry / Farmer carry",
          barbell: steady("3×30 sec · rest 90 sec"),
          dumbbell: steady("3×40 yd · rest 90 sec"),
        },
      ],
    },
    {
      day: "Tuesday",
      type: "training",
      focus: "Upper body — push emphasis",
      structure: "Warm-up 10 min · Main → secondary → accessories · Cooldown 5 min",
      exercises: [
        {
          pattern: "Push",
          name: "Bench press / Dumbbell bench press",
          barbell: [
            "4×5 @ RPE 6–7 · rest 2–3 min",
            "4×6 @ RPE 7 · rest 2–3 min",
            "Top set of 5 @ RPE 8, then 3×5 @ −10% · rest 3 min",
            "3×5 @ −20% · rest 2 min",
          ],
          dumbbell: [
            "4×8–10 · rest 2 min",
            "4×10 · rest 2 min",
            "4×10, heavier bells · rest 2 min",
            "3×8, lighter bells · rest 90 sec",
          ],
        },
        {
          pattern: "Push",
          name: "Overhead press / Half-kneeling one-arm press",
          barbell: [
            "3×6 @ RPE 6–7 · rest 2 min",
            "3×8 @ RPE 7 · rest 2 min",
            "3×6, add 5 lb · rest 2 min",
            "2×6, −20% load · rest 90 sec",
          ],
          dumbbell: [
            "3×8/side · rest 90 sec",
            "3×10/side · rest 90 sec",
            "3×8/side, heavier bell · rest 90 sec",
            "2×8/side, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Push",
          name: "Incline bench press / Incline dumbbell press",
          barbell: steady("3×8 @ RPE 7 · rest 90 sec"),
          dumbbell: steady("3×10 · rest 90 sec"),
        },
        {
          pattern: "Push",
          name: "Close-grip bench press / Lying triceps extension",
          barbell: steady("3×8 · rest 90 sec"),
          dumbbell: steady("3×10 · rest 75 sec"),
        },
        {
          pattern: "Push",
          name: "Upright row / Lateral raise",
          barbell: steady("3×10 · rest 60 sec"),
          dumbbell: steady("3×12–15 · rest 60 sec"),
          note: "Upright row path: keep the grip wide and pull to lower-chest height so the shoulders stay comfortable.",
        },
        {
          pattern: "Core",
          name: "Plank / Suitcase hold",
          barbell: steady("3×40 sec · rest 60 sec"),
          dumbbell: steady("3×30 sec/side · rest 60 sec"),
        },
      ],
    },
    {
      day: "Wednesday",
      type: "training",
      focus: "Lower body — hinge emphasis",
      structure: "Warm-up 10 min · Main → secondary → accessories · Cooldown 5 min",
      exercises: [
        {
          pattern: "Hinge",
          name: "Deadlift / Dumbbell deadlift",
          barbell: [
            "4×4 @ RPE 6–7 · rest 3 min",
            "4×5 @ RPE 7 · rest 3 min",
            "Top set of 4 @ RPE 8, then 3×4 @ −10% · rest 3 min",
            "3×4 @ −20% · rest 2 min",
          ],
          dumbbell: [
            "4×8 · rest 2 min",
            "4×8, heavier bells · rest 2 min",
            "4×8, heavier bells again · rest 2 min",
            "3×8, lighter bells · rest 2 min",
          ],
          note: "Every rep starts from a full reset: brace, big breath, push the floor away. No touch-and-go reps on heavy weeks.",
        },
        {
          pattern: "Hinge",
          name: "Barbell hip thrust / Dumbbell hip thrust",
          barbell: [
            "3×8 @ RPE 6–7 · rest 2 min",
            "3×10 @ RPE 7 · rest 2 min",
            "3×8, add 10 lb · rest 2 min",
            "2×10, −20% load · rest 90 sec",
          ],
          dumbbell: [
            "3×12 · rest 90 sec",
            "3×12, heavier bell · rest 90 sec",
            "3×12, heavier bell again · rest 90 sec",
            "2×12, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Single-leg",
          name: "Single-leg Romanian deadlift / Same, dumbbell",
          barbell: steady("3×8/leg · rest 90 sec"),
          dumbbell: steady("3×10/leg · rest 90 sec"),
        },
        {
          pattern: "Hinge",
          name: "Back extension / Single-leg hip thrust",
          barbell: steady("3×12 · rest 75 sec"),
          dumbbell: steady("3×12/leg · rest 75 sec"),
          note: "Back extension path: hug a small plate to your chest once bodyweight reps feel easy.",
        },
        {
          pattern: "Carry",
          name: "Suitcase carry / Same, dumbbell",
          barbell: steady("3×30 sec/side · rest 90 sec"),
          dumbbell: steady("3×40 yd/side · rest 90 sec"),
        },
        {
          pattern: "Core",
          name: "Pallof press / Dead bug",
          barbell: steady("3×10/side · rest 60 sec"),
          dumbbell: steady("3×10/side · rest 60 sec"),
        },
      ],
    },
    {
      day: "Thursday",
      type: "training",
      focus: "Upper body — pull emphasis",
      structure: "Warm-up 10 min · Main → secondary → accessories · Cooldown 5 min",
      exercises: [
        {
          pattern: "Pull",
          name: "Bent-over row / One-arm dumbbell row",
          barbell: [
            "4×6 @ RPE 6–7 · rest 2 min",
            "4×8 @ RPE 7 · rest 2 min",
            "Top set of 6 @ RPE 8, then 3×6 @ −10% · rest 2–3 min",
            "3×6 @ −20% · rest 2 min",
          ],
          dumbbell: [
            "4×10/side · rest 90 sec",
            "4×10/side, heavier bell · rest 90 sec",
            "4×10/side, heavier bell again · rest 2 min",
            "3×10/side, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Pull",
          name: "Pull-up or lat pulldown / Inverted row",
          barbell: steady("3×8–10 · rest 2 min"),
          dumbbell: steady("3×10–12 · rest 90 sec"),
          note: "Barbell path for the inverted row: a bar set in the rack at hip height, body straight, chest to the bar. Band-assisted pull-ups also work here.",
        },
        {
          pattern: "Pull",
          name: "Chest-supported row / Chest-supported dumbbell row",
          barbell: steady("3×10 · rest 90 sec"),
          dumbbell: steady("3×10/side · rest 75 sec"),
        },
        {
          pattern: "Pull",
          name: "Wide-grip row / Rear-delt fly",
          barbell: steady("3×10–12 · rest 60 sec"),
          dumbbell: steady("3×12–15 · rest 60 sec"),
        },
        {
          pattern: "Pull",
          name: "Barbell curl / Dumbbell curl",
          barbell: steady("3×10 · rest 60 sec"),
          dumbbell: steady("3×10–12 · rest 60 sec"),
        },
        {
          pattern: "Core",
          name: "Barbell rollout / Hollow-body hold",
          barbell: steady("3×10 · rest 60 sec"),
          dumbbell: steady("3×30 sec · rest 60 sec"),
        },
      ],
    },
    {
      day: "Friday",
      type: "training",
      focus: "Full body + conditioning",
      structure:
        "Warm-up 10 min · Straight sets, then the conditioning block · Cooldown 5 min",
      exercises: [
        {
          pattern: "Push",
          name: "Push press / Dumbbell push press",
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
          barbell: [
            "3×6 @ RPE 6–7 · rest 2 min",
            "3×8 @ RPE 7 · rest 2 min",
            "3×6, add 5–10 lb · rest 2 min",
            "2×6, −20% load · rest 90 sec",
          ],
          dumbbell: [
            "3×10 · rest 90 sec",
            "3×10, heavier bell · rest 90 sec",
            "3×10, heavier bell again · rest 90 sec",
            "2×10, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Pull",
          name: "Chest-supported row / One-arm dumbbell row",
          barbell: steady("3×10 · rest 90 sec"),
          dumbbell: steady("3×10/side · rest 75 sec"),
        },
        {
          pattern: "Power",
          name: "Speed deadlift / Dumbbell swing",
          barbell: [
            "6×2 @ 50% · rest 60 sec",
            "6×2 @ 55% · rest 60 sec",
            "6×2 @ 60% · rest 60 sec",
            "4×2 @ 50% · rest 60 sec",
          ],
          dumbbell: [
            "4×12 · rest 60 sec",
            "5×12 · rest 60 sec",
            "5×15 · rest 60 sec",
            "3×12, lighter bell · rest 60 sec",
          ],
          note: "Speed deadlift path: crisp, fast singles of two — the bar moves with intent, never grinds. Swing path: hips snap, arms stay ropes.",
        },
        {
          pattern: "Carry",
          name: "Farmer carry / Same, dumbbell",
          barbell: steady("3×30 sec · rest 90 sec"),
          dumbbell: steady("3×40 yd, heavier bells · rest 90 sec"),
        },
        {
          pattern: "Conditioning",
          name: "Finishing circuit — thrusters, swings, crawl",
          barbell: [
            "8 min circuit",
            "10 min circuit",
            "12 min circuit",
            "6 min easy circuit",
          ],
          dumbbell: [
            "8 min circuit",
            "10 min circuit",
            "12 min circuit",
            "6 min easy circuit",
          ],
          note: "One round per minute: 8 thrusters, 10 swings, 20 yd bear crawl. Leave 20–30 seconds of rest each minute; cap effort at conversational-hard.",
        },
      ],
    },
    {
      day: "Saturday",
      type: "active-recovery",
      focus: "Easy 30–45 minute walk, hike, or bike ride + 10 minutes of mobility",
      exercises: [],
    },
    {
      day: "Sunday",
      type: "rest",
      focus: "Full rest. Food, sleep, and nothing structured.",
      exercises: [],
    },
  ],
  whoItFits: [
    "Lifters who can commit five real sessions a week and want a complete lower/upper/hinge/pull/conditioning week designed for them.",
    "Intermediate lifters who have outgrown two-to-three-day templates and want honest main-lift progression with accessories attached.",
    "People who like a gym rhythm: same lifts on the same days, heavier in week 3, lighter in week 4.",
  ],
  whoShouldSkip: [
    "Lifters who cannot reliably recover from five weekly sessions — the 30-minute plan delivers more per hour of life spent.",
    "Anyone with active pain that changes how they squat, hinge, press, or pull — clear it first.",
  ],
  faqs: [
    {
      question: "Is five days per week too much?",
      answer:
        "Not if the sessions are run as written. The split spreads lower-body stress across Monday and Wednesday and keeps Friday's conditioning submaximal, and week 4 is a planned deload. If sleep or life stress tanks, repeat a week rather than pushing through.",
    },
    {
      question: "Can I run this as a four-day plan?",
      answer:
        "Yes — drop Friday first and fold its carries into Thursday. The lower/upper/lower/upper week still hits every pattern twice.",
    },
    {
      question: "How long should rests really be?",
      answer:
        "Main lifts need 2–3 minutes so the next set keeps its quality; accessories run 60–90 seconds. If a session is running long, shorten accessory rests, never main-lift rests.",
    },
    {
      question: "Do I have to use both barbells and dumbbells?",
      answer:
        "No. Pick one path per lift and stay with it for the block — mixing paths mid-block makes progression hard to track. Most people run all-barbell in a full gym or all-dumbbell at home.",
    },
    {
      question: "What should I do after these four weeks?",
      answer:
        "Re-run the block with the week-3 top sets as your new week-1 working weights, or switch to the 2-hour tier if you want longer sessions with more accessory and conditioning work.",
    },
  ],
  relatedLinks: [
    {
      href: "/compound-strength/2-hours",
      label: "2-hour compound strength plan",
      description:
        "The fullest tier: longer warm-ups, heavier top sets, and a dedicated conditioning block every session.",
    },
    {
      href: "/compound-strength/30-minutes",
      label: "30-minute compound strength plan",
      description:
        "The same patterns compressed for weeks when five hour-long sessions are not realistic.",
    },
    {
      href: "/tools/deload-week-planner",
      label: "Deload week planner",
      description:
        "How to plan the lighter week 4 and the deloads that follow future blocks.",
    },
    {
      href: "/workout-plans",
      label: "Printable workout plans",
      description:
        "Multi-week PDF blocks with paper log sheets if you want this structure in your hand.",
    },
  ],
};
