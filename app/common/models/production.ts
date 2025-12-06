import type { NonDupeFood } from "./material";

export type Production = {
  inputId: string;
  inputValue: number;
  foodType: NonDupeFood;
  outputId: string;
  outputValue: number;
};
