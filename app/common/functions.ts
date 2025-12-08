import { useEffect, useState } from "react";
import { Helper } from "./classes/helper";
import type { Entity } from "./models/entity";

export function* getRange(start: number = 0, end: number): Generator<number> {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

export function useGet<T extends Entity>(url: string) {
  const [helper, setHelper] = useState<Helper<T> | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch(url).then(async (response) => {
      if (response.status !== 200) {
        response.text().then((error) => {
          setErr(error);
        });
        return;
      }

      response.json().then((parsedJson) => {
        const helper = new Helper<T>(parsedJson);
        setHelper(helper);
      });
    });
  }, []);

  return { helper, err };
}
