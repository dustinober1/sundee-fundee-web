import fs from "node:fs";
import path from "node:path";

import type { CompoundProgramSlug } from "./types";

const WEEKLY_DIR = path.join(
  process.cwd(),
  "src",
  "lib",
  "compound-strength",
  "weekly",
);

const DAY_TYPES = ["training", "active-recovery", "rest"] as const;
const PATTERNS = [
  "Squat",
  "Hinge",
  "Single-leg",
  "Push",
  "Pull",
  "Carry",
  "Core",
  "Power",
  "Conditioning",
] as const;
const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
const TIERS: CompoundProgramSlug[] = [
  "15-minutes",
  "30-minutes",
  "1-hour",
  "2-hours",
];
const BANNED_PHRASES = ["functional", "filly", "revival strength"];

export type WeeklyExercise = {
  pattern: (typeof PATTERNS)[number];
  name: string;
  barbell: string;
  dumbbell: string;
  note?: string;
};

export type WeeklyDay = {
  day: (typeof WEEKDAYS)[number];
  type: (typeof DAY_TYPES)[number];
  focus: string;
  structure?: string;
  exercises: WeeklyExercise[];
};

export type WeeklyWorkout = {
  weekId: string;
  startDate: string;
  title: string;
  intro: string;
  featuredTier: CompoundProgramSlug;
  weekTheme: string;
  coachNotes: string[];
  days: WeeklyDay[];
};

export class WeeklyWorkoutValidationError extends Error {}

function fail(weekFile: string, message: string): never {
  throw new WeeklyWorkoutValidationError(
    `Invalid weekly workout ${weekFile}: ${message}`,
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(
  source: Record<string, unknown>,
  field: string,
  weekFile: string,
  minLength = 1,
): string {
  const value = source[field];
  if (typeof value !== "string" || value.trim().length < minLength) {
    fail(weekFile, `${field} must be a string of at least ${minLength} characters`);
  }
  return value;
}

export function isoWeekId(date: Date): string {
  const utc = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const dayNumber = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-w${String(week).padStart(2, "0")}`;
}

function parseStartDate(weekFile: string, value: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    fail(weekFile, "startDate must be an ISO date (YYYY-MM-DD)");
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    fail(weekFile, "startDate must be a real calendar date");
  }
  if (date.getUTCDay() !== 1) {
    fail(weekFile, "startDate must be a Monday (UTC)");
  }
  return date;
}

export function validateWeeklyWorkout(
  weekFile: string,
  source: unknown,
): WeeklyWorkout {
  if (!isPlainObject(source)) {
    fail(weekFile, "top-level value must be an object");
  }

  const weekId = requireString(source, "weekId", weekFile);
  if (!/^\d{4}-w(0[1-9]|[1-4]\d|5[0-3])$/.test(weekId)) {
    fail(weekFile, "weekId must match YYYY-wWW, e.g. 2026-w43");
  }

  const startDate = parseStartDate(weekFile, requireString(source, "startDate", weekFile));
  if (isoWeekId(startDate) !== weekId) {
    fail(
      weekFile,
      `weekId ${weekId} does not match startDate ${startDate.toISOString().slice(0, 10)}`,
    );
  }

  const featuredTier = requireString(source, "featuredTier", weekFile);
  if (!TIERS.includes(featuredTier as CompoundProgramSlug)) {
    fail(weekFile, `featuredTier must be one of ${TIERS.join(", ")}`);
  }

  if (!Array.isArray(source.coachNotes) || source.coachNotes.length < 1) {
    fail(weekFile, "coachNotes must be a non-empty array of strings");
  }

  if (!Array.isArray(source.days) || source.days.length !== 7) {
    fail(weekFile, "days must contain exactly 7 entries");
  }

  const seenDays = new Set<string>();
  const days = (source.days as unknown[]).map((entry, index) => {
    if (!isPlainObject(entry)) {
      fail(weekFile, `days[${index}] must be an object`);
    }
    const day = requireString(entry, "day", weekFile);
    if (!WEEKDAYS.includes(day as (typeof WEEKDAYS)[number])) {
      fail(weekFile, `days[${index}].day must be one of ${WEEKDAYS.join(", ")}`);
    }
    if (seenDays.has(day)) {
      fail(weekFile, `duplicate day ${day}`);
    }
    seenDays.add(day);

    const type = requireString(entry, "type", weekFile);
    if (!DAY_TYPES.includes(type as (typeof DAY_TYPES)[number])) {
      fail(weekFile, `days[${index}].type must be one of ${DAY_TYPES.join(", ")}`);
    }

    const focus = requireString(entry, "focus", weekFile);
    const exercises: WeeklyExercise[] = [];
    if (type === "training") {
      if (!Array.isArray(entry.exercises) || entry.exercises.length < 2) {
        fail(weekFile, `training day ${day} needs at least 2 exercises`);
      }
      for (const raw of entry.exercises as unknown[]) {
        if (!isPlainObject(raw)) {
          fail(weekFile, `exercises on ${day} must be objects`);
        }
        const pattern = requireString(raw, "pattern", weekFile);
        if (!PATTERNS.includes(pattern as (typeof PATTERNS)[number])) {
          fail(weekFile, `exercise pattern "${pattern}" is not one of ${PATTERNS.join(", ")}`);
        }
        exercises.push({
          pattern: pattern as WeeklyExercise["pattern"],
          name: requireString(raw, "name", weekFile),
          barbell: requireString(raw, "barbell", weekFile),
          dumbbell: requireString(raw, "dumbbell", weekFile),
          note: typeof raw.note === "string" ? raw.note : undefined,
        });
      }
    } else if (Array.isArray(entry.exercises) && entry.exercises.length > 0) {
      fail(weekFile, `non-training day ${day} must not carry exercises`);
    }

    const dayResult: WeeklyDay = {
      day: day as WeeklyDay["day"],
      type: type as WeeklyDay["type"],
      focus,
      exercises,
    };
    if (typeof entry.structure === "string") {
      dayResult.structure = entry.structure;
    }
    if (type === "training" && !dayResult.structure) {
      fail(weekFile, `training day ${day} needs a structure string`);
    }
    return dayResult;
  });

  if (seenDays.size !== WEEKDAYS.length) {
    fail(weekFile, "days must cover Monday through Sunday");
  }

  const workout: WeeklyWorkout = {
    weekId,
    startDate: startDate.toISOString().slice(0, 10),
    title: requireString(source, "title", weekFile),
    intro: requireString(source, "intro", weekFile, 20),
    featuredTier: featuredTier as CompoundProgramSlug,
    weekTheme: requireString(source, "weekTheme", weekFile),
    coachNotes: source.coachNotes as string[],
    days,
  };

  const serialized = JSON.stringify(workout).toLowerCase();
  for (const phrase of BANNED_PHRASES) {
    if (serialized.includes(phrase)) {
      fail(weekFile, `copy contains banned phrase "${phrase}"`);
    }
  }

  return workout;
}

export function loadWeeklyWorkouts(): WeeklyWorkout[] {
  if (!fs.existsSync(WEEKLY_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(WEEKLY_DIR)
    .filter((file) => file.endsWith(".json"))
    .sort();

  const workouts = files.map((file) => {
    const raw = fs.readFileSync(path.join(WEEKLY_DIR, file), "utf8");
    return validateWeeklyWorkout(file, JSON.parse(raw));
  });

  const seenWeekIds = new Set<string>();
  const seenStarts = new Set<string>();
  for (const workout of workouts) {
    if (seenWeekIds.has(workout.weekId)) {
      fail(workout.weekId, "duplicate weekId across weekly files");
    }
    if (seenStarts.has(workout.startDate)) {
      fail(workout.weekId, "duplicate startDate across weekly files");
    }
    seenWeekIds.add(workout.weekId);
    seenStarts.add(workout.startDate);
  }

  return workouts.sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
}

export function getWeeklyWorkout(
  weekId: string,
): WeeklyWorkout | undefined {
  return loadWeeklyWorkouts().find((workout) => workout.weekId === weekId);
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The week whose Monday-to-Sunday window contains the reference date, falling
 * back to the most recent posted week when the schedule has a gap. Returns
 * undefined when nothing has been posted yet.
 */
export function resolveCurrentWeek(
  reference: Date = new Date(),
): WeeklyWorkout | undefined {
  const workouts = loadWeeklyWorkouts();
  if (workouts.length === 0) {
    return undefined;
  }

  const refTime = Date.UTC(
    reference.getUTCFullYear(),
    reference.getUTCMonth(),
    reference.getUTCDate(),
  );
  const containing = workouts.find((workout) => {
    const start = Date.parse(`${workout.startDate}T00:00:00Z`);
    return start <= refTime && refTime < start + 7 * DAY_MS;
  });
  if (containing) {
    return containing;
  }

  return workouts.find(
    (workout) => Date.parse(`${workout.startDate}T00:00:00Z`) <= refTime,
  );
}

/** Posted weeks other than the current one, newest first. */
export function getArchiveWeeks(
  reference: Date = new Date(),
): WeeklyWorkout[] {
  const current = resolveCurrentWeek(reference);
  return loadWeeklyWorkouts().filter(
    (workout) => !current || workout.weekId !== current.weekId,
  );
}

export function weekDateRange(startDate: string): string {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(start.getTime() + 6 * DAY_MS);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return `${formatter.format(start)} – ${formatter.format(end)}, ${end.getUTCFullYear()}`;
}

export function pdfPathForWeek(weekId: string): string {
  return `/workout-plans/compound-strength-week-${weekId}.pdf`;
}
