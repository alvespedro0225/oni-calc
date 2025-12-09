import { useState } from "react";

type commandFunction = (id: string, value: number) => void;
type queryFunction = () => [string, number][];

export function useResults(): [
  commandFunction,
  commandFunction,
  queryFunction,
] {
  const [result, setResult] = useState(new Map<string, number>());

  function addMaterial(id: string, value: number) {
    const clone = { ...result };
    const cur = clone.get(id) ?? 0;
    clone.set(id, cur + value);
    setResult(clone);
  }

  function subMaterial(id: string, value: number) {
    const clone = { ...result };
    const cur = clone.get(id) ?? 0;
    clone.set(id, cur - value);
    setResult(clone);
  }

  function getValues() {
    const array = [];

    for (const element of result.entries()) {
      array.push(element);
    }

    return array;
  }

  return [addMaterial, subMaterial, getValues];
}
