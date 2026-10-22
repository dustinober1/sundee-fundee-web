export const COMPOUND_STRENGTH_HUB_PATH = "/compound-strength";

export type WeekPrescription = [string, string, string, string];

export type CompoundPattern =
  | "Squat"
  | "Hinge"
  | "Single-leg"
  | "Push"
  | "Pull"
  | "Carry"
  | "Core"
  | "Power"
  | "Conditioning";

export type CompoundExercise = {
  pattern: CompoundPattern;
  name: string;
  barbell: WeekPrescription;
  dumbbell: WeekPrescription;
  note?: string;
};

export type CompoundDayType = "training" | "active-recovery" | "rest";

export type CompoundDay = {
  day: string;
  type: CompoundDayType;
  focus: string;
  structure?: string;
  exercises: CompoundExercise[];
};

export type CompoundProgramSlug =
  | "15-minutes"
  | "30-minutes"
  | "1-hour"
  | "2-hours";

export type CompoundProgram = {
  slug: CompoundProgramSlug;
  title: string;
  shortTitle: string;
  minutesPerDay: number;
  daysPerWeek: number;
  tagline: string;
  description: string;
  landingTitle: string;
  landingDescription: string;
  searchIntent: string;
  sessionStructure: string;
  equipmentNote: string;
  progressionRule: string;
  weekThemes: [string, string, string, string];
  week: CompoundDay[];
  whoItFits: string[];
  whoShouldSkip: string[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string; description: string }[];
};

export const steady = (prescription: string): WeekPrescription => [
  prescription,
  prescription,
  prescription,
  prescription,
];
