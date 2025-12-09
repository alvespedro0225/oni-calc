import { useState } from "react";
import type { ResultHelper } from "../models/results";

export function useResults(): ResultHelper {
  const [result, setResult] = useState(new Map<string, number>());

  function addMaterial(id: string, value: number) {
    setResult((old) => {
      const clone = new Map(old);
      const cur = old.get(id) ?? 0;
      clone.set(id, cur + value);
      return clone;
    });
  }

  function subMaterial(id: string, value: number) {
    setResult((old) => {
      const clone = new Map(old);
      const cur = old.get(id) ?? 0;
      clone.set(id, cur - value);
      return clone;
    });
  }

  function getValues() {
    const array = [];

    for (const element of result.entries()) {
      array.push(element);
    }

    return array;
  }

  return { addMaterial, subMaterial, getValues };
}
