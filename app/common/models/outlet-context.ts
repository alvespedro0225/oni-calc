import type { Helper } from "./helper";
import type { Critter } from "./critter";
import type { ResultHelper } from "./results";

export type OutletContext = {
  result: ResultHelper;
  critters: Helper<Critter>;
};
