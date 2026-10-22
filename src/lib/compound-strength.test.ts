import { describe, expect, it } from "vitest";
import {
  COMPOUND_STRENGTH_HUB_PATH,
  compoundPrograms,
  getCompoundProgram,
} from "./compound-strength";

const EXPECTED_SLUGS = ["15-minutes", "30-minutes", "1-hour", "2-hours"];

const BANNED_PHRASES = [
  "functional",
  "functional bodybuilding",
  "filly",
  "revival strength",
];

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function serialized(program: (typeof compoundPrograms)[number]): string {
  return JSON.stringify(program).toLowerCase();
}

describe("compound strength programs", () => {
  it("defines exactly four programs in ascending time order", () => {
    expect(compoundPrograms).toHaveLength(4);
    expect(compoundPrograms.map((program) => program.slug)).toEqual(
      EXPECTED_SLUGS,
    );
    const minutes = compoundPrograms.map((program) => program.minutesPerDay);
    expect(minutes).toEqual([15, 30, 60, 120]);
  });

  it("has complete landing-page data for every program", () => {
    for (const program of compoundPrograms) {
      expect(program.landingTitle.length).toBeGreaterThanOrEqual(30);
      expect(program.landingTitle.length).toBeLessThanOrEqual(70);
      expect(program.landingDescription.length).toBeGreaterThanOrEqual(110);
      expect(program.landingDescription.length).toBeLessThanOrEqual(170);
      expect(program.searchIntent.length).toBeGreaterThanOrEqual(25);
      expect(program.tagline.length).toBeGreaterThan(0);
      expect(program.description.length).toBeGreaterThan(0);
      expect(program.sessionStructure.length).toBeGreaterThan(0);
      expect(program.equipmentNote.length).toBeGreaterThan(0);
      expect(program.progressionRule.length).toBeGreaterThan(0);
      expect(program.whoItFits.length).toBeGreaterThanOrEqual(3);
      expect(program.whoShouldSkip.length).toBeGreaterThanOrEqual(2);
      expect(program.faqs.length).toBeGreaterThanOrEqual(4);
      expect(program.relatedLinks.length).toBeGreaterThanOrEqual(3);
      expect(program.weekThemes).toHaveLength(4);
    }
  });

  it("defines a complete seven-day week with structured training days", () => {
    for (const program of compoundPrograms) {
      expect(program.week).toHaveLength(7);
      expect(program.week.map((day) => day.day)).toEqual(WEEKDAYS);

      const trainingDays = program.week.filter(
        (day) => day.type === "training",
      );
      expect(trainingDays.length).toBe(program.daysPerWeek);
      expect(program.daysPerWeek).toBeGreaterThanOrEqual(4);

      for (const day of program.week) {
        if (day.type === "training") {
          expect(day.exercises.length).toBeGreaterThanOrEqual(2);
          expect(day.structure).toBeTruthy();
          expect(day.focus).toBeTruthy();
        } else {
          expect(day.exercises).toHaveLength(0);
          expect(day.focus).toBeTruthy();
        }
      }
    }
  });

  it("prescribes all four weeks on both equipment paths for every exercise", () => {
    for (const program of compoundPrograms) {
      for (const day of program.week) {
        for (const exercise of day.exercises) {
          expect(exercise.barbell).toHaveLength(4);
          expect(exercise.dumbbell).toHaveLength(4);
          for (let week = 0; week < 4; week += 1) {
            expect(exercise.barbell[week].length).toBeGreaterThan(0);
            expect(exercise.dumbbell[week].length).toBeGreaterThan(0);
          }
          expect(exercise.name.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("keeps section copy clear of brand-guardrail phrases", () => {
    for (const program of compoundPrograms) {
      const text = serialized(program);
      for (const phrase of BANNED_PHRASES) {
        expect(text).not.toContain(phrase);
      }
    }
  });

  it("resolves programs by slug with unique, url-safe slugs", () => {
    const slugs = new Set(compoundPrograms.map((program) => program.slug));
    expect(slugs.size).toBe(compoundPrograms.length);

    for (const slug of EXPECTED_SLUGS) {
      expect(getCompoundProgram(slug)?.slug).toBe(slug);
    }
    expect(getCompoundProgram("not-a-plan")).toBeUndefined();
    expect(COMPOUND_STRENGTH_HUB_PATH).toBe("/compound-strength");
  });
});
