import type { Input } from "./input";

export type Production = {
  id: string;
  input: Input[];
  output: Input[];
};
