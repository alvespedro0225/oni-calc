export type ResultHelper = {
  addMaterial: commandFunction;
  subMaterial: commandFunction;
  getValues: queryFunction;
};

type commandFunction = (id: string, value: number) => void;
type queryFunction = () => [string, number][];
