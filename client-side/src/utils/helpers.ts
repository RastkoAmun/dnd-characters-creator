export enum AbilityScores {
  STRENGTH = "STRENGTH",
  DEXTERITY = "DEXTERITY",
  CONSTITUTION = "CONSTITUTION",
  INTELLIGENCE = "INTELLIGENCE",
  WISDOM = "WISDOM",
  CHARISMA = "CHARISMA",
}

export enum CharacterCreationTabNumbers {
  CORE = 0,
  ARCHTYPE = 1,
  ABILITY_SCORES = 2,
  PROFICIENCIES = 3,
  FINALIZE = 4,
}

export const SKILLS = [
  "acrobatics",
  "animal handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "slight of hand",
  "stealth",
  "survival",
] as const;

export const SAVING_THROWS = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export type SkillProficiencies = (typeof SKILLS)[number];
export type SavingThrowsProficiencies = (typeof SAVING_THROWS)[number];

export const CLASSES = new Set([
  "Artificer",
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
]);

type AbilityScoreModifierType = {
  modifier: number;
  sign: string;
};

export const slug = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const calculateModifier = (value: number): AbilityScoreModifierType => {
  switch (value) {
    case 10:
    case 11:
      return {
        modifier: 0,
        sign: "+",
      };
    case 12:
    case 13:
      return {
        modifier: 1,
        sign: "+",
      };
    case 14:
    case 15:
      return {
        modifier: 2,
        sign: "+",
      };
    case 16:
    case 17:
      return {
        modifier: 3,
        sign: "+",
      };
    case 18:
    case 19:
      return {
        modifier: 4,
        sign: "+",
      };
    case 20:
    case 21:
      return {
        modifier: 5,
        sign: "+",
      };
    case 9:
    case 8:
      return {
        modifier: -1,
        sign: "",
      };
    case 7:
    case 6:
      return {
        modifier: -2,
        sign: "",
      };
    case 5:
    case 4:
      return {
        modifier: -3,
        sign: "",
      };
    case 3:
      return {
        modifier: -4,
        sign: "",
      };
    case 22:
    case 23:
      return {
        modifier: 6,
        sign: "+"
      }
    case 24:
    case 25:
      return {
        modifier: 7,
        sign: "+"
      }
    case 26:
      return {
        modifier: 8,
        sign: "+"
      }
    default:
      return {
        modifier: 0,
        sign: "",
      };
  }
};

export const calculateProficiency = (level: number) => {
  switch (true) {
    case level <= 4:
      return 2;
    case level <= 8:
      return 3;
    case level <= 12:
      return 4;
    case level <= 16:
      return 5;
    case level <= 20:
      return 6;
    default:
      return 2;
  }
};
