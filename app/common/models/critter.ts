import type { Dlc } from "../enums";
import type { Material, NonDupeFood } from "./material";

export type Critter = {
  name: string;
  id: string;
  imagePath: string;
  input: CritterInput[];
  output: string;
  sheeding: string[] | null;
  drops: Material[];
  space: number;
  maxAge: number;
  baseReproduction: number;
  baseIncubation: number;
  dlc: Dlc;
};

export type CritterInput = {
  id: string;
  critterId: string;
  food: NonDupeFood;
  inputValue: number;
  outputValue: number;
};
