import { z } from "zod";

// ------------------------ Schema Helpers ----------------------------
const abilityKeys = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export const archtypeKeys = [
  "class",
  "subclass",
  "race",
  "subrace",
  "speed",
  "armor",
] as const;

export const coreInfoKeys = [
  "name",
  "maxHealth",
] as const;

const abilityScore = (label: string) =>
  z.coerce
    .number({ error: `${label} must be a number` })
    .int(`${label} must be an integer`)
    .min(3, `Must be between 3 and 26`)
    .max(26, `Must be between 3 and 26`);

const intInRange = (label: string, min: number, max: number) =>
  z.coerce
    .number({ error: `${label} must be a number` })
    .int(`${label} must be an integer`)
    .min(min, `${label} must be minimum ${min}`)
    .max(max, `${label} cannot exceed ${max}`);


// ------------------------ SCHEMAS -----------------------------------
export const abilityScoresZodSchema = z.object({
  strength: abilityScore("Strength"),
  dexterity: abilityScore("Dexterity"),
  constitution: abilityScore("Constitution"),
  intelligence: abilityScore("Intelligence"),
  wisdom: abilityScore("Wisdom"),
  charisma: abilityScore("Charisma"),
});

export const archtypeZodSchema = z.object({
  class: z
    .string()
    .trim()
    .max(20, `Maximum 20 chars`)
    .min(1, `Field cannot be empty`),
  subclass: z.string().trim().max(30, `Maximum 30 chars`).min(1, `Field cannot be empty`),
  race: z.string().trim().max(20, `Maximum 20 chars`).min(1, `Field cannot be empty`),
  subrace: z.string().trim().max(30, `Maximum 30 chars`),
  speed: intInRange("Speed", 15, 60),
  armor: intInRange("Armor", 8, 35),
});

export const coreInfoZodSchema = z.object({
  name: z.string().trim().max(30, `Name cannot exceed 30 chars`).min(1, `Field cannot be empty`),
  maxHealth: intInRange("Health", 6, 250)
})

export const characterCreateZodSchema = z.object({
  archtype: archtypeZodSchema,
  abilityScores: abilityScoresZodSchema,
  coreInfo: coreInfoZodSchema,
});


// ------------------------ Types needed for Schemas --------------------------
export type AbilityKey = (typeof abilityKeys)[number];
export type AbilityErrors = Partial<Record<AbilityKey, string>>;

export type ArchtypeKey = (typeof archtypeKeys)[number];
export type ArchtypeErrors = Partial<Record<ArchtypeKey, string>>;

export type CoreInfoKey = (typeof coreInfoKeys)[number];
export type CoreInfoErrors = Partial<Record<CoreInfoKey, string>>;
