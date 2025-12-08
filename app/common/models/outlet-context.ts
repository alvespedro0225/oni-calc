import type { Dispatch, SetStateAction } from "react";
import type { ResultManager } from "./result-manager";
import type { Helper } from "./helper";
import type { Critter } from "./critter";

export type OutletContext = {
  result: {
    res: ResultManager;
    setRes: Dispatch<SetStateAction<ResultManager>>;
  };
  critters: Helper<Critter>;
};
