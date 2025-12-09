import type { Dlc } from "../enums";
import type { Farmable } from "./farmable";
import type { Input } from "./input";
import type { Production } from "./production";

export interface Critter extends Farmable {
  name: string;
  id: string;
  imagePath: string;
  production: Production[];
  sheeding: string[] | null;
  drops: Input[];
  space: number;
  maxAge: number;
  baseReproduction: number;
  baseIncubation: number;
  dlc: Dlc;
  eggId: string;
}
