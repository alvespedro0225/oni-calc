import type { NonDupeFoodVariant } from "../enums";

export type Material = {
  name: string;
  id: string;
  imagePath: string;
};

export type NonDupeFood = {
  id: string;
  variant: NonDupeFoodVariant;
};
