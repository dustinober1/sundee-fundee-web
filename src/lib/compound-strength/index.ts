import { fifteenMinuteProgram } from "./15-minutes";
import { thirtyMinuteProgram } from "./30-minutes";
import { oneHourProgram } from "./1-hour";
import { twoHourProgram } from "./2-hours";
import type { CompoundProgram, CompoundProgramSlug } from "./types";

export * from "./types";

export const compoundPrograms: CompoundProgram[] = [
  fifteenMinuteProgram,
  thirtyMinuteProgram,
  oneHourProgram,
  twoHourProgram,
];

export function getCompoundProgram(
  slug: string,
): CompoundProgram | undefined {
  return compoundPrograms.find((program) => program.slug === slug);
}

export type { CompoundProgram, CompoundProgramSlug };
