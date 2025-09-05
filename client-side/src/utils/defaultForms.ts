import { SavingThrowsProficiencies, SkillProficiencies } from "./helpers";

const coreInfoDefaultForm = {
  name: "",
  level: 1,
};

const healthDefaultForm = {
  maxHealth: 6,
  currentHealth: 0,
  tempHealth: 0,
  healthDice: "d6",
};

const archtypeDefaultForm = {
  class: "",
  subclass: "",
  race: "",
  subrace: "",
  speed: 30,
  armor: 10
};

const abilityScoreDefaultForm = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
};

const proficienciesDefaultForm = {
  proficiencies: [] as SkillProficiencies[],
  savingThrows: [] as SavingThrowsProficiencies[]
}

export const characterSheetDefault = {
  coreInfo: coreInfoDefaultForm,
  health: healthDefaultForm,
  archtype: archtypeDefaultForm,
  abilityScores: abilityScoreDefaultForm,
  proficiencies: proficienciesDefaultForm
};

export {
  abilityScoreDefaultForm,
  coreInfoDefaultForm,
  healthDefaultForm,
  archtypeDefaultForm,
  proficienciesDefaultForm
};
