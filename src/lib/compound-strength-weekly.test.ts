import { describe, expect, it } from "vitest";
import {
  WeeklyWorkoutValidationError,
  getArchiveWeeks,
  getWeeklyWorkout,
  isoWeekId,
  loadWeeklyWorkouts,
  pdfPathForWeek,
  resolveCurrentWeek,
  validateWeeklyWorkout,
  weekDateRange,
} from "./compound-strength/weekly";

const SEED = validateWeeklyWorkout(
  "test.json",
  JSON.parse(
    JSON.stringify({
      weekId: "2026-w43",
      startDate: "2026-10-19",
      title: "Volume Build — Squats, Hinges, and a New Finisher",
      intro: "Week 2 of the fall block turns the effort up one notch.",
      featuredTier: "30-minutes",
      weekTheme: "Volume build",
      coachNotes: ["Add reps before load."],
      days: [
        {
          day: "Monday",
          type: "training",
          focus: "Lower — squat emphasis",
          structure: "Warm-up 5 min · Straight sets · Cooldown 5 min",
          exercises: [
            {
              pattern: "Squat",
              name: "Back squat / Goblet squat",
              barbell: "4×8 @ RPE 7",
              dumbbell: "4×10",
            },
            {
              pattern: "Carry",
              name: "Farmer carry",
              barbell: "3×35 sec",
              dumbbell: "3×40 yd",
            },
          ],
        },
        {
          day: "Tuesday",
          type: "rest",
          focus: "Full rest.",
          exercises: [],
        },
        {
          day: "Wednesday",
          type: "rest",
          focus: "Full rest.",
          exercises: [],
        },
        {
          day: "Thursday",
          type: "rest",
          focus: "Full rest.",
          exercises: [],
        },
        {
          day: "Friday",
          type: "rest",
          focus: "Full rest.",
          exercises: [],
        },
        {
          day: "Saturday",
          type: "rest",
          focus: "Full rest.",
          exercises: [],
        },
        {
          day: "Sunday",
          type: "rest",
          focus: "Full rest.",
          exercises: [],
        },
      ],
    }),
  ),
);

describe("weekly compound strength workouts", () => {
  it("loads and validates the posted weekly files", () => {
    const workouts = loadWeeklyWorkouts();
    expect(workouts.length).toBeGreaterThanOrEqual(1);

    const seed = getWeeklyWorkout("2026-w43");
    expect(seed).toBeDefined();
    expect(seed?.startDate).toBe("2026-10-19");
    expect(seed?.featuredTier).toBe("30-minutes");
    expect(seed?.days).toHaveLength(7);
    expect(seed?.days.filter((day) => day.type === "training")).toHaveLength(4);
    for (const day of seed?.days ?? []) {
      for (const exercise of day.exercises) {
        expect(exercise.barbell.length).toBeGreaterThan(0);
        expect(exercise.dumbbell.length).toBeGreaterThan(0);
      }
    }
  });

  it("computes ISO week ids", () => {
    expect(isoWeekId(new Date("2026-10-22T12:00:00Z"))).toBe("2026-w43");
    expect(isoWeekId(new Date("2026-01-01T12:00:00Z"))).toBe("2026-w01");
    expect(isoWeekId(new Date("2025-12-29T12:00:00Z"))).toBe("2026-w01");
    expect(isoWeekId(new Date("2027-01-01T12:00:00Z"))).toBe("2026-w53");
  });

  it("resolves the current week by date window with a stale fallback", () => {
    expect(resolveCurrentWeek(new Date("2026-10-22T15:00:00Z"))?.weekId).toBe(
      "2026-w43",
    );
    expect(resolveCurrentWeek(new Date("2026-10-25T23:00:00Z"))?.weekId).toBe(
      "2026-w43",
    );
    // Before anything is posted.
    expect(resolveCurrentWeek(new Date("2026-10-01T12:00:00Z"))).toBeUndefined();
    // After the window passes, the most recent posted week still serves.
    expect(resolveCurrentWeek(new Date("2026-11-20T12:00:00Z"))?.weekId).toBe(
      "2026-w43",
    );
  });

  it("keeps the current week out of the archive", () => {
    const archive = getArchiveWeeks(new Date("2026-10-22T15:00:00Z"));
    expect(archive.map((week) => week.weekId)).not.toContain("2026-w43");
  });

  it("formats a readable date range", () => {
    expect(weekDateRange("2026-10-19")).toBe(
      "October 19 – October 25, 2026",
    );
  });

  it("rejects invalid weekly data", () => {
    const base = JSON.parse(JSON.stringify(SEED));

    const mismatched = JSON.parse(JSON.stringify(base));
    mismatched.weekId = "2026-w44";
    expect(() =>
      validateWeeklyWorkout("bad.json", mismatched),
    ).toThrow(WeeklyWorkoutValidationError);

    const notMonday = JSON.parse(JSON.stringify(base));
    notMonday.startDate = "2026-10-20";
    expect(() =>
      validateWeeklyWorkout("bad.json", notMonday),
    ).toThrow(WeeklyWorkoutValidationError);

    const shortDays = JSON.parse(JSON.stringify(base));
    shortDays.days = shortDays.days.slice(0, 6);
    expect(() =>
      validateWeeklyWorkout("bad.json", shortDays),
    ).toThrow(WeeklyWorkoutValidationError);

    const thinTrainingDay = JSON.parse(JSON.stringify(base));
    thinTrainingDay.days[0].exercises = [thinTrainingDay.days[0].exercises[0]];
    expect(() =>
      validateWeeklyWorkout("bad.json", thinTrainingDay),
    ).toThrow(WeeklyWorkoutValidationError);

    const banned = JSON.parse(JSON.stringify(base));
    banned.intro = "A functional training week for everyone.";
    expect(() =>
      validateWeeklyWorkout("bad.json", banned),
    ).toThrow(WeeklyWorkoutValidationError);
  });

  it("maps weeks to their PDF paths", () => {
    expect(pdfPathForWeek("2026-w43")).toBe(
      "/workout-plans/compound-strength-week-2026-w43.pdf",
    );
  });
});
