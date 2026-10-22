import type { CompoundProgram } from "./types";
import { steady } from "./types";

export const twoHourProgram: CompoundProgram = {
  slug: "2-hours",
  title: "2-Hour Compound Strength Plan",
  shortTitle: "2 Hours",
  minutesPerDay: 120,
  daysPerWeek: 5,
  tagline:
    "The full session: unhurried warm-ups, heavy top sets, and a real conditioning block.",
  description:
    "A four-week compound strength block for people with time to train properly: five two-hour sessions a week with extended warm-ups, top-set main lifts, secondary lifts, four accessories, carries, and a dedicated conditioning block.",
  landingTitle: "2 Hour Compound Strength Plan | 5-Day Weekly Schedule",
  landingDescription:
    "Get a free 2 hour compound strength plan with five weekly sessions, top-set squats, deadlifts, presses, and rows, plus carries, accessories, and a conditioning block.",
  searchIntent:
    "Find a 2 hour compound strength plan with a five-day schedule, heavy top sets, full accessory work, and a four-week progression.",
  sessionStructure:
    "Sessions run 15 minutes of warm-up and mobility, a main lift worked up to a top set, a secondary lift for four sets, three or four accessories, a loaded carry, a 10–15 minute conditioning block, and a 10-minute cooldown. Long rests are a feature: 3–4 minutes on main lifts, 2 minutes on secondaries.",
  equipmentNote:
    "Every lift comes in two paths: a barbell version and a dumbbell version. At this tier the barbell paths are the intended main route — top-set work rewards small plate jumps — but the dumbbell paths keep every session viable in a garage or small gym.",
  progressionRule:
    "Week 1 sets technical baselines at RPE 6–7, week 2 adds volume, week 3 trades volume for a true top set at RPE 8 with back-offs at −10%, and week 4 deloads to about 60% of week-3 volume. Between blocks, restart week 1 with roughly your week-3 weights minus a little.",
  weekThemes: ["Technique base", "Volume build", "Top-set push", "Deload"],
  week: [
    {
      day: "Monday",
      type: "training",
      focus: "Lower body — squat emphasis",
      structure:
        "Warm-up + mobility 15 min · Main → secondary → accessories → carry → conditioning · Cooldown 10 min",
      exercises: [
        {
          pattern: "Squat",
          name: "Back squat / Heavy goblet squat",
          barbell: [
            "Work to 5×3 @ RPE 6–7 · rest 3 min",
            "Work to 5×4 @ RPE 7 · rest 3 min",
            "Top set of 3 @ RPE 8, then 4×3 @ −10% · rest 3–4 min",
            "3×3 @ −25% · rest 2 min",
          ],
          dumbbell: [
            "5×6 heavy goblet squats · rest 2–3 min",
            "5×8 heavy goblet squats · rest 2–3 min",
            "5×8, heaviest bell of the block · rest 3 min",
            "3×6, lighter bell · rest 2 min",
          ],
        },
        {
          pattern: "Squat",
          name: "Pause squat / Goblet squat (3-sec pause)",
          barbell: [
            "4×4 @ RPE 6–7 · rest 2 min",
            "4×5 @ RPE 7 · rest 2 min",
            "4×4 @ −15% of main · rest 2 min",
            "2×4, light · rest 90 sec",
          ],
          dumbbell: steady("3×6 with 3-sec pause in the hole · rest 2 min"),
          note: "The pause kills the bounce and exposes weak positions. Breathe at the top, brace, then descend.",
        },
        {
          pattern: "Single-leg",
          name: "Bulgarian split squat / Dumbbell Bulgarian split squat",
          barbell: steady("3×8/leg · rest 2 min"),
          dumbbell: steady("3×10/leg · rest 90 sec"),
        },
        {
          pattern: "Hinge",
          name: "Romanian deadlift / Dumbbell Romanian deadlift",
          barbell: steady("3×8 @ RPE 7 · rest 2 min"),
          dumbbell: steady("3×10 · rest 90 sec"),
        },
        {
          pattern: "Core",
          name: "Barbell rollout / Weighted dead bug",
          barbell: steady("4×10 · rest 75 sec"),
          dumbbell: steady("4×10/side · rest 75 sec"),
        },
        {
          pattern: "Carry",
          name: "Front-rack carry / Farmer carry",
          barbell: [
            "4×30 sec · rest 2 min",
            "4×35 sec · rest 2 min",
            "4×40 sec, heavier · rest 2 min",
            "2×30 sec, lighter · rest 90 sec",
          ],
          dumbbell: [
            "4×40 yd · rest 2 min",
            "4×40 yd, heavier · rest 2 min",
            "4×40 yd, heavier again · rest 2 min",
            "2×40 yd, lighter · rest 90 sec",
          ],
        },
        {
          pattern: "Conditioning",
          name: "Bike or rower intervals",
          barbell: [
            "8 × 1 min hard / 1 min easy",
            "10 × 1 min hard / 1 min easy",
            "12 × 1 min hard / 1 min easy",
            "5 × 1 min hard / 1 min easy",
          ],
          dumbbell: [
            "8 × 1 min hard / 1 min easy",
            "10 × 1 min hard / 1 min easy",
            "12 × 1 min hard / 1 min easy",
            "5 × 1 min hard / 1 min easy",
          ],
          note: "Hard means you could not hold a conversation during the work minute. The easy minute is genuinely easy.",
        },
      ],
    },
    {
      day: "Tuesday",
      type: "training",
      focus: "Upper body — push emphasis",
      structure:
        "Warm-up + mobility 15 min · Main → secondary → accessories → carry → conditioning · Cooldown 10 min",
      exercises: [
        {
          pattern: "Push",
          name: "Bench press / Heavy dumbbell bench press",
          barbell: [
            "Work to 5×3 @ RPE 6–7 · rest 3 min",
            "Work to 5×4 @ RPE 7 · rest 3 min",
            "Top set of 3 @ RPE 8, then 4×3 @ −10% · rest 3–4 min",
            "3×3 @ −25% · rest 2 min",
          ],
          dumbbell: [
            "5×8 · rest 2–3 min",
            "5×10 · rest 2–3 min",
            "5×10, heaviest bells of the block · rest 3 min",
            "3×8, lighter bells · rest 2 min",
          ],
        },
        {
          pattern: "Push",
          name: "Overhead press / Half-kneeling one-arm press",
          barbell: [
            "4×5 @ RPE 6–7 · rest 2–3 min",
            "4×6 @ RPE 7 · rest 2–3 min",
            "Top set of 5 @ RPE 8, then 3×5 @ −10% · rest 3 min",
            "2×5 @ −25% · rest 2 min",
          ],
          dumbbell: [
            "4×8/side · rest 2 min",
            "4×10/side · rest 2 min",
            "4×8/side, heavier bell · rest 2 min",
            "2×8/side, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Push",
          name: "Incline bench press / Incline dumbbell press",
          barbell: steady("4×6 @ RPE 7 · rest 2 min"),
          dumbbell: steady("4×8 · rest 90 sec"),
        },
        {
          pattern: "Push",
          name: "Weighted dip / Close-grip bench press",
          barbell: steady("3×8 · rest 2 min"),
          dumbbell: steady("3×10 · rest 90 sec"),
          note: "Barbell path covers the dip slot with close-grip benching; add a dip attachment only if your shoulders agree with the movement.",
        },
        {
          pattern: "Push",
          name: "Lying triceps extension / Same, dumbbell",
          barbell: steady("3×10 · rest 75 sec"),
          dumbbell: steady("3×12 · rest 75 sec"),
        },
        {
          pattern: "Push",
          name: "Upright row / Lateral raise",
          barbell: steady("3×12 · rest 60 sec"),
          dumbbell: steady("3×15 · rest 60 sec"),
        },
        {
          pattern: "Core",
          name: "Hollow-body hold / Suitcase hold",
          barbell: steady("4×30 sec · rest 60 sec"),
          dumbbell: steady("4×30 sec/side · rest 60 sec"),
        },
        {
          pattern: "Conditioning",
          name: "Ski erg or push-up ladder",
          barbell: [
            "5 rounds: 15 push-ups + 400 m easy ski",
            "6 rounds",
            "7 rounds",
            "3 rounds",
          ],
          dumbbell: [
            "5 rounds: 15 push-ups + 400 m easy row",
            "6 rounds",
            "7 rounds",
            "3 rounds",
          ],
        },
      ],
    },
    {
      day: "Wednesday",
      type: "training",
      focus: "Lower body — hinge emphasis",
      structure:
        "Warm-up + mobility 15 min · Main → secondary → accessories → carry → conditioning · Cooldown 10 min",
      exercises: [
        {
          pattern: "Hinge",
          name: "Deadlift / Heavy dumbbell deadlift",
          barbell: [
            "Work to 5×3 @ RPE 6–7 · rest 3–4 min",
            "Work to 5×4 @ RPE 7 · rest 3–4 min",
            "Top set of 3 @ RPE 8, then 4×3 @ −10% · rest 4 min",
            "3×3 @ −25% · rest 2–3 min",
          ],
          dumbbell: [
            "5×8 · rest 2–3 min",
            "5×10 · rest 2–3 min",
            "5×8, heaviest bells of the block · rest 3 min",
            "3×8, lighter bells · rest 2 min",
          ],
          note: "Full reset between reps on the barbell path. On the top-set week, treat the opener like a max attempt with two reps left.",
        },
        {
          pattern: "Hinge",
          name: "Barbell hip thrust / Dumbbell hip thrust",
          barbell: [
            "4×6 @ RPE 6–7 · rest 2–3 min",
            "4×8 @ RPE 7 · rest 2–3 min",
            "Top set of 6 @ RPE 8, then 3×6 @ −10% · rest 3 min",
            "2×8 @ −25% · rest 2 min",
          ],
          dumbbell: [
            "4×10 · rest 2 min",
            "4×12 · rest 2 min",
            "4×10, heavier bell · rest 2 min",
            "2×10, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Hinge",
          name: "Good morning / Single-leg Romanian deadlift",
          barbell: steady("3×8 @ RPE 6–7 · rest 2 min"),
          dumbbell: steady("3×10/leg · rest 90 sec"),
          note: "Good mornings stay light and strict: soft knees, long spine, hips travel back. If your low back complains, take the single-leg path.",
        },
        {
          pattern: "Hinge",
          name: "Back extension / Single-leg hip thrust",
          barbell: steady("3×12 · rest 90 sec"),
          dumbbell: steady("3×12/leg · rest 90 sec"),
        },
        {
          pattern: "Single-leg",
          name: "Walking lunge / Dumbbell walking lunge",
          barbell: steady("3×10 steps/leg · rest 2 min"),
          dumbbell: steady("3×12 steps/leg · rest 2 min"),
        },
        {
          pattern: "Carry",
          name: "Suitcase carry / Same, dumbbell",
          barbell: [
            "4×30 sec/side · rest 2 min",
            "4×35 sec/side · rest 2 min",
            "4×40 sec/side, heavier · rest 2 min",
            "2×30 sec/side, lighter · rest 90 sec",
          ],
          dumbbell: [
            "4×40 yd/side · rest 2 min",
            "4×40 yd/side, heavier · rest 2 min",
            "4×40 yd/side, heavier again · rest 2 min",
            "2×40 yd/side, lighter · rest 90 sec",
          ],
        },
        {
          pattern: "Conditioning",
          name: "Swing and step-up circuit",
          barbell: [
            "8 min: 12 swings + 8 step-ups/leg every 90 sec",
            "10 min circuit",
            "12 min circuit",
            "6 min easy circuit",
          ],
          dumbbell: [
            "8 min: 12 swings + 8 step-ups/leg every 90 sec",
            "10 min circuit",
            "12 min circuit",
            "6 min easy circuit",
          ],
        },
      ],
    },
    {
      day: "Thursday",
      type: "training",
      focus: "Upper body — pull emphasis",
      structure:
        "Warm-up + mobility 15 min · Main → secondary → accessories → carry → conditioning · Cooldown 10 min",
      exercises: [
        {
          pattern: "Pull",
          name: "Pendlay row / Heavy one-arm row",
          barbell: [
            "Work to 5×4 @ RPE 6–7 · rest 3 min",
            "Work to 5×5 @ RPE 7 · rest 3 min",
            "Top set of 5 @ RPE 8, then 4×5 @ −10% · rest 3–4 min",
            "3×5 @ −25% · rest 2 min",
          ],
          dumbbell: [
            "5×10/side · rest 2 min",
            "5×10/side, heavier · rest 2 min",
            "5×10/side, heaviest of the block · rest 2–3 min",
            "3×10/side, lighter · rest 2 min",
          ],
          note: "Pendlay path: every rep returns to the floor, back flat, then an aggressive pull to the belly. Strict but explosive.",
        },
        {
          pattern: "Pull",
          name: "Weighted pull-up / Inverted row",
          barbell: [
            "4×5 @ RPE 6–7 · rest 2–3 min",
            "4×6 @ RPE 7 · rest 2–3 min",
            "Top set of 5 @ RPE 8, then 3×5 @ −10% · rest 3 min",
            "2×5, bodyweight · rest 2 min",
          ],
          dumbbell: [
            "4×10–12 · rest 2 min",
            "4×12 · rest 2 min",
            "4×12, elevate feet or add a weight vest · rest 2 min",
            "2×10, easier angle · rest 90 sec",
          ],
          note: "No pull-ups yet? Band-assisted reps or heavy lat pulldowns fill this slot on either path.",
        },
        {
          pattern: "Pull",
          name: "Chest-supported row / Chest-supported dumbbell row",
          barbell: steady("3×10 @ RPE 7 · rest 90 sec"),
          dumbbell: steady("3×12/side · rest 90 sec"),
        },
        {
          pattern: "Pull",
          name: "Wide-grip row / Rear-delt fly",
          barbell: steady("3×12 · rest 75 sec"),
          dumbbell: steady("3×15 · rest 75 sec"),
        },
        {
          pattern: "Pull",
          name: "Face pull / Band pull-apart",
          barbell: steady("3×15 · rest 60 sec"),
          dumbbell: steady("3×20 · rest 60 sec"),
        },
        {
          pattern: "Pull",
          name: "Barbell curl / Dumbbell hammer curl",
          barbell: steady("3×10 · rest 60 sec"),
          dumbbell: steady("3×12 · rest 60 sec"),
        },
        {
          pattern: "Core",
          name: "Barbell rollout / Hollow-body hold",
          barbell: steady("4×10 · rest 60 sec"),
          dumbbell: steady("4×30–40 sec · rest 60 sec"),
        },
        {
          pattern: "Conditioning",
          name: "Concept 2 or sled-work intervals",
          barbell: [
            "6 × 2 min steady-hard / 1 min easy",
            "8 × 2 min / 1 min easy",
            "8 × 2 min, slightly harder / 1 min easy",
            "4 × 2 min easy / 1 min easy",
          ],
          dumbbell: [
            "6 × 2 min steady-hard / 1 min easy",
            "8 × 2 min / 1 min easy",
            "8 × 2 min, slightly harder / 1 min easy",
            "4 × 2 min easy / 1 min easy",
          ],
        },
      ],
    },
    {
      day: "Friday",
      type: "training",
      focus: "Full body + conditioning",
      structure:
        "Warm-up + mobility 15 min · Straight sets → carry → conditioning block · Cooldown 10 min",
      exercises: [
        {
          pattern: "Push",
          name: "Push press / Dumbbell push press",
          barbell: [
            "Work to 5×3 @ RPE 6–7 · rest 2–3 min",
            "Work to 5×4 @ RPE 7 · rest 2–3 min",
            "Top set of 3 @ RPE 8, then 4×3 @ −10% · rest 3 min",
            "3×3 @ −25% · rest 2 min",
          ],
          dumbbell: [
            "5×8 · rest 2 min",
            "5×10 · rest 2 min",
            "5×8, heavier bells · rest 2 min",
            "3×8, lighter bells · rest 90 sec",
          ],
        },
        {
          pattern: "Squat",
          name: "Front squat / Goblet squat",
          barbell: [
            "4×4 @ RPE 6–7 · rest 2–3 min",
            "4×5 @ RPE 7 · rest 2–3 min",
            "4×4 @ −15% of Monday's top set · rest 3 min",
            "2×4, light · rest 2 min",
          ],
          dumbbell: [
            "4×8 · rest 2 min",
            "4×10 · rest 2 min",
            "4×8, heavier bell · rest 2 min",
            "2×8, lighter bell · rest 90 sec",
          ],
        },
        {
          pattern: "Power",
          name: "Speed deadlift / Dumbbell swing",
          barbell: [
            "8×2 @ 50% · rest 75 sec",
            "8×2 @ 55% · rest 75 sec",
            "8×2 @ 60% · rest 75 sec",
            "5×2 @ 50% · rest 75 sec",
          ],
          dumbbell: [
            "5×15 · rest 75 sec",
            "6×15 · rest 75 sec",
            "6×20 · rest 75 sec",
            "4×15, lighter bell · rest 75 sec",
          ],
          note: "Speed work is about bar velocity, not load: the barbell snaps off the floor and the set ends before the speed does.",
        },
        {
          pattern: "Pull",
          name: "Chest-supported row / One-arm dumbbell row",
          barbell: steady("3×10 · rest 90 sec"),
          dumbbell: steady("3×12/side · rest 75 sec"),
        },
        {
          pattern: "Carry",
          name: "Farmer carry / Same, dumbbell",
          barbell: [
            "5×30 sec · rest 2 min",
            "5×35 sec, heavier · rest 2 min",
            "5×40 sec, heaviest of the block · rest 2 min",
            "3×30 sec, lighter · rest 90 sec",
          ],
          dumbbell: [
            "5×40 yd · rest 2 min",
            "5×40 yd, heavier · rest 2 min",
            "5×40 yd, heaviest of the block · rest 2 min",
            "3×40 yd, lighter · rest 90 sec",
          ],
        },
        {
          pattern: "Conditioning",
          name: "Friday finisher — thruster, swing, crawl circuit",
          barbell: [
            "10 min: 8 thrusters + 10 swings + 20 yd crawl each minute",
            "12 min circuit",
            "14 min circuit, same reps",
            "8 min easy circuit",
          ],
          dumbbell: [
            "10 min: 8 thrusters + 10 swings + 20 yd crawl each minute",
            "12 min circuit",
            "14 min circuit, same reps",
            "8 min easy circuit",
          ],
          note: "If the reps start costing you form, cut a round instead of cutting depth. This should feel like hard cardio, not a lift.",
        },
      ],
    },
    {
      day: "Saturday",
      type: "active-recovery",
      focus:
        "Easy 30–45 minute walk or bike + 10 minutes of mobility. Optional 20-minute technique practice: one main lift, work to 3 easy doubles at about 60%.",
      exercises: [],
    },
    {
      day: "Sunday",
      type: "rest",
      focus: "Full rest. Two-hour weeks are earned in bed and at the table.",
      exercises: [],
    },
  ],
  whoItFits: [
    "Lifters who love long sessions and can give training two unhurried hours five days a week.",
    "Intermediate-to-advanced lifters who want top-set work on the main lifts with the accessory volume most plans skip.",
    "People who recover well from high volume and want conditioning built into the training week instead of bolted on.",
  ],
  whoShouldSkip: [
    "Anyone still building base strength and technique — the 1-hour tier delivers more progress per hour at this stage.",
    "Lifters in a high-stress season of life; two-hour sessions that get truncated mid-week become junk volume fast.",
    "Anyone with active pain that changes how they squat, hinge, press, or pull — clear it first.",
  ],
  faqs: [
    {
      question: "Do I really need two full hours?",
      answer:
        "The session is designed to fill two hours without filler: long warm-up, real rest periods on main lifts, four accessories, carries, and conditioning. If a session consistently runs short, add weight rather than exercises; if it runs long, trim the conditioning block, never the main lift.",
    },
    {
      question: "What does a 'top set' mean here?",
      answer:
        "In week 3 you work up to one heavy set at RPE 8 — about two reps left in the tank — then take your remaining sets at roughly 10% lighter. It gives you a measurable number to beat next block without true maxing.",
    },
    {
      question: "Is this plan too much volume?",
      answer:
        "For an intermediate lifter sleeping and eating reasonably, no — the four-week wave builds volume, peaks it, then deliberately cuts it in week 4. If performance slides for two sessions in a row, repeat the current week instead of advancing.",
    },
    {
      question: "Why is every session so warm-up heavy?",
      answer:
        "Fifteen minutes is what honest squat, deadlift, and bench preparation actually takes: general raise in temperature, targeted mobility for what is stiff, then progressive ramp-up sets. Skipped warm-ups are where two-hour plans usually break people.",
    },
    {
      question: "Can I keep running other cardio?",
      answer:
        "Yes, but place it on the weekend or after lifting, and keep hard intervals away from Monday and Wednesday. The in-plan conditioning blocks are already calibrated to the strength work.",
    },
  ],
  relatedLinks: [
    {
      href: "/compound-strength/1-hour",
      label: "1-hour compound strength plan",
      description:
        "The same five-day structure at half the session length, for busier seasons.",
    },
    {
      href: "/tools/deload-week-planner",
      label: "Deload week planner",
      description:
        "Week 4 is built in — use this tool to plan the deloads between future blocks.",
    },
    {
      href: "/tools/rpe-rir-chart",
      label: "RPE and RIR chart",
      description:
        "Top sets live and die on honest RPE calls. This chart keeps them honest.",
    },
    {
      href: "/workout-plans",
      label: "Printable workout plans",
      description:
        "Specialized multi-week PDF blocks — squat peaking, dumbbell-only, and more.",
    },
  ],
};
