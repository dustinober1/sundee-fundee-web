import type { CompoundProgram } from "./types";
import { steady } from "./types";

export const fifteenMinuteProgram: CompoundProgram = {
  slug: "15-minutes",
  title: "15-Minute Compound Strength Plan",
  shortTitle: "15 Minutes",
  minutesPerDay: 15,
  daysPerWeek: 4,
  tagline: "Full-body compound lifting in the time a coffee takes to brew.",
  description:
    "A four-week compound strength block built for the busiest schedules: four 15-minute sessions a week built on supersets of squats, hinges, pushes, pulls, carries, and core work.",
  landingTitle: "15 Minute Compound Strength Plan | 4-Week Weekly Schedule",
  landingDescription:
    "Follow a free 15 minute compound strength plan with four weekly sessions built on squats, hinges, pushes, pulls, and carries, plus a clear four-week progression.",
  searchIntent:
    "Find a 15 minute compound strength plan that fits four short sessions into a busy week.",
  sessionStructure:
    "Every session runs the same clock: a 2-minute warm-up, supersets of two or three compound lifts done back-to-back with short rests, and a 1-minute cooldown. Pick a weight you could lift twice more at the end of each set, and move with control rather than racing.",
  equipmentNote:
    "Every lift comes in two paths: a barbell version and a dumbbell version. The barbell path lets loads climb in small jumps; the dumbbell path works in a small space, sets up faster, and is easier on busy gym hours. Both paths follow the same weekly plan.",
  progressionRule:
    "When you finish every set with at least two reps left in the tank for two sessions in a row, add 5 lb to upper-body lifts and 10 lb to lower-body lifts, or move up one dumbbell. Week 3 is the week to nudge load; week 4 pulls the volume back so you start the next block fresh.",
  weekThemes: ["Technique base", "Volume build", "Load push", "Deload"],
  week: [
    {
      day: "Monday",
      type: "training",
      focus: "Full body A — squat + press",
      structure:
        "Warm-up 2 min · Superset A1/A2, then B · Cooldown 1 min",
      exercises: [
        {
          pattern: "Squat",
          name: "Back squat / Goblet squat",
          barbell: [
            "2 rounds × 5 · rest 60 sec",
            "3 rounds × 6 · rest 60 sec",
            "3 rounds × 6, add 5–10 lb · rest 75 sec",
            "2 rounds × 5, −20% load · rest 60 sec",
          ],
          dumbbell: [
            "2 rounds × 8–10 · rest 45 sec",
            "3 rounds × 10 · rest 45 sec",
            "3 rounds × 10, heavier bell · rest 60 sec",
            "2 rounds × 8, lighter bell · rest 45 sec",
          ],
        },
        {
          pattern: "Push",
          name: "Overhead press / Half-kneeling one-arm press",
          barbell: [
            "2 rounds × 6 · rest 60 sec",
            "3 rounds × 6 · rest 60 sec",
            "3 rounds × 6, add 5 lb · rest 75 sec",
            "2 rounds × 5, −20% load · rest 60 sec",
          ],
          dumbbell: [
            "2 rounds × 8/side · rest 45 sec",
            "3 rounds × 8/side · rest 45 sec",
            "3 rounds × 8/side, heavier bell · rest 60 sec",
            "2 rounds × 8/side, lighter bell · rest 45 sec",
          ],
        },
        {
          pattern: "Pull",
          name: "Bent-over row / One-arm row",
          barbell: [
            "2 rounds × 8 · rest 60 sec",
            "3 rounds × 8 · rest 60 sec",
            "3 rounds × 8, add 5 lb · rest 75 sec",
            "2 rounds × 8, −20% load · rest 60 sec",
          ],
          dumbbell: [
            "2 rounds × 10/side · rest 45 sec",
            "3 rounds × 10/side · rest 45 sec",
            "3 rounds × 10/side, heavier bell · rest 60 sec",
            "2 rounds × 10/side, lighter bell · rest 45 sec",
          ],
          note: "Rows finish each round. Keep your ribs down and pull to your hip, not your chest.",
        },
      ],
    },
    {
      day: "Tuesday",
      type: "training",
      focus: "Full body B — hinge + horizontal push",
      structure:
        "Warm-up 2 min · Superset A1/A2, then B · Cooldown 1 min",
      exercises: [
        {
          pattern: "Hinge",
          name: "Deadlift / Dumbbell deadlift",
          barbell: [
            "2 rounds × 5 · rest 75 sec",
            "3 rounds × 5 · rest 75 sec",
            "3 rounds × 5, add 10 lb · rest 90 sec",
            "2 rounds × 5, −20% load · rest 75 sec",
          ],
          dumbbell: [
            "2 rounds × 8 · rest 60 sec",
            "3 rounds × 8 · rest 60 sec",
            "3 rounds × 8, heavier bells · rest 75 sec",
            "2 rounds × 8, lighter bells · rest 60 sec",
          ],
          note: "Set the bells just outside your feet, brace, and push the floor away. The bar or bells stay close to your legs.",
        },
        {
          pattern: "Push",
          name: "Push-up / Dumbbell bench press",
          barbell: steady("2 rounds × 8–12 · rest 60 sec"),
          dumbbell: [
            "2 rounds × 10 · rest 45 sec",
            "3 rounds × 10 · rest 45 sec",
            "3 rounds × 10, heavier bells · rest 60 sec",
            "2 rounds × 10, lighter bells · rest 45 sec",
          ],
          note: "Push-up path: elevate your hands on a bench when 8 reps feels sloppy, or raise your feet when 12 feels easy.",
        },
        {
          pattern: "Core",
          name: "Pallof press / Dead bug",
          barbell: steady("2 rounds × 8/side · rest 40 sec"),
          dumbbell: steady("2 rounds × 8/side · rest 40 sec"),
          note: "Pallof path: anchor a band or cable at chest height — or press a light bell straight up while lying with one foot elevated (dead bug).",
        },
      ],
    },
    {
      day: "Wednesday",
      type: "active-recovery",
      focus: "20–30 minute walk + 5 minutes of hip and ankle mobility",
      exercises: [],
    },
    {
      day: "Thursday",
      type: "training",
      focus: "Full body C — lunge + press + row",
      structure:
        "Warm-up 2 min · Superset A1/A2, then B · Cooldown 1 min",
      exercises: [
        {
          pattern: "Single-leg",
          name: "Reverse lunge / Dumbbell reverse lunge",
          barbell: [
            "2 rounds × 6/leg · rest 60 sec",
            "3 rounds × 6/leg · rest 60 sec",
            "3 rounds × 6/leg, add load · rest 75 sec",
            "2 rounds × 6/leg, −20% load · rest 60 sec",
          ],
          dumbbell: [
            "2 rounds × 8/leg · rest 45 sec",
            "3 rounds × 8/leg · rest 45 sec",
            "3 rounds × 8/leg, heavier bells · rest 60 sec",
            "2 rounds × 8/leg, lighter bells · rest 45 sec",
          ],
        },
        {
          pattern: "Push",
          name: "Incline push-up / Incline dumbbell press",
          barbell: steady("2 rounds × 10–12 · rest 60 sec"),
          dumbbell: [
            "2 rounds × 10 · rest 45 sec",
            "3 rounds × 10 · rest 45 sec",
            "3 rounds × 10, heavier bells · rest 60 sec",
            "2 rounds × 10, lighter bells · rest 45 sec",
          ],
        },
        {
          pattern: "Pull",
          name: "Chest-supported row / Chest-supported dumbbell row",
          barbell: steady("2 rounds × 10 · rest 60 sec"),
          dumbbell: steady("2 rounds × 10/side · rest 45 sec"),
          note: "Set the bench to 30–45°. Supporting your chest takes momentum out of the row and puts it back in your upper back.",
        },
      ],
    },
    {
      day: "Friday",
      type: "training",
      focus: "Carries + hips + core",
      structure:
        "Warm-up 2 min · Circuit A1/A2/A3 × the week's rounds · Cooldown 1 min",
      exercises: [
        {
          pattern: "Carry",
          name: "Front-rack carry / Farmer carry",
          barbell: [
            "2 rounds × 30 sec · rest 60 sec",
            "3 rounds × 30 sec · rest 60 sec",
            "3 rounds × 30 sec, add load · rest 75 sec",
            "2 rounds × 30 sec, −20% load · rest 60 sec",
          ],
          dumbbell: [
            "2 rounds × 40 yd · rest 60 sec",
            "3 rounds × 40 yd · rest 60 sec",
            "3 rounds × 40 yd, heavier bells · rest 75 sec",
            "2 rounds × 40 yd, lighter bells · rest 60 sec",
          ],
          note: "Rack the bar at your shoulders (barbell path) or hold heavy bells at your sides (dumbbell path). Walk tall — no leaning.",
        },
        {
          pattern: "Hinge",
          name: "Barbell hip thrust / Dumbbell swing",
          barbell: [
            "2 rounds × 10 · rest 60 sec",
            "3 rounds × 10 · rest 60 sec",
            "3 rounds × 10, add 10 lb · rest 75 sec",
            "2 rounds × 10, −20% load · rest 60 sec",
          ],
          dumbbell: [
            "2 rounds × 12 · rest 45 sec",
            "3 rounds × 12 · rest 45 sec",
            "3 rounds × 12, heavier bell · rest 60 sec",
            "2 rounds × 12, lighter bell · rest 45 sec",
          ],
          note: "Dumbbell swing path is a hip-driven swing to chest height — the arms stay relaxed; the hips do the work.",
        },
        {
          pattern: "Core",
          name: "Side plank / Suitcase hold",
          barbell: steady("2 rounds × 25 sec/side · rest 40 sec"),
          dumbbell: steady("2 rounds × 25 sec/side · rest 40 sec"),
          note: "Suitcase hold: grab one heavy bell or a loaded bar held like a suitcase and refuse to lean. Time under tension beats crunches here.",
        },
      ],
    },
    {
      day: "Saturday",
      type: "rest",
      focus: "Full rest. Sleep, food, and easy movement only.",
      exercises: [],
    },
    {
      day: "Sunday",
      type: "active-recovery",
      focus: "Easy walk, easy bike ride, or a 15-minute mobility flow",
      exercises: [],
    },
  ],
  whoItFits: [
    "People who keep quitting long programs because the sessions eat the whole evening.",
    "Lifters who want the big compound movements four days a week without living at the gym.",
    "Beginners who would rather practice a few lifts often than learn ten lifts rarely.",
    "Anyone stacking training onto a full life — the entire four-week block costs just four hours of total training time, warm-ups included.",
  ],
  whoShouldSkip: [
    "Anyone with active pain that changes how they squat, hinge, or press — clear that first.",
    "Lifters chasing maximum strength on the big three, who need longer rest periods than a 15-minute window allows.",
  ],
  faqs: [
    {
      question: "Can you build strength in 15 minutes a day?",
      answer:
        "Yes, as long as the 15 minutes are spent on heavy compound lifts instead of wandering. Four focused sessions a week on squats, hinges, presses, rows, and carries is enough volume to build real strength, especially in your first year of lifting.",
    },
    {
      question: "How do I warm up in only 2 minutes?",
      answer:
        "Do the first lift empty or with half your working weight for 5–8 slow reps, then a brisk set of 10 bodyweight squats and 10 arm circles. The early rounds of each superset double as rehearsal, so keep the first round deliberately smooth.",
    },
    {
      question: "Should I pick the barbell or dumbbell path?",
      answer:
        "Pick whichever you will actually set up. Dumbbells suit small spaces and busy gyms; barbells make small load jumps easier once you are past the beginner stage. You can mix paths lift by lift — the plan works either way.",
    },
    {
      question: "What happens after the four weeks?",
      answer:
        "Repeat the block with slightly heavier loads, or move up to the 30-minute plan if your schedule opens up. Week 4 is a planned deload, so you restart the next block recovered rather than stale.",
    },
    {
      question: "Is four days per week required?",
      answer:
        "Three of the four sessions still covers every movement pattern once — drop the Friday carries-and-core day first if life gets busy, and keep the two full-body days plus one other.",
    },
  ],
  relatedLinks: [
    {
      href: "/compound-strength/30-minutes",
      label: "30-minute compound strength plan",
      description:
        "When 15 minutes starts feeling short, this tier adds straight sets and a fourth training day's worth of volume.",
    },
    {
      href: "/workout-plans",
      label: "Printable workout plans",
      description:
        "Longer multi-week PDF blocks with log sheets you can print and mark up by hand.",
    },
    {
      href: "/tools/rpe-rir-chart",
      label: "RPE and RIR chart",
      description:
        "A quick reference for the effort targets this plan uses, so 'two reps left in the tank' stays honest.",
    },
    {
      href: "/blog/warm-up-protocol-for-strength-training",
      label: "Warm-up protocol for strength training",
      description:
        "A fuller warm-up routine for the days when you are not racing the clock.",
    },
  ],
};
