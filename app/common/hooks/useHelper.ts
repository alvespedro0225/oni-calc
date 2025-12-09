import { useState } from "react";
import type { Entity } from "../models/entity";
import type { Helper } from "../models/helper";

export function useHelper<T extends Entity>(array: T[]): Helper<T> {
  const [map, _] = useState(arrayToMap(array));

  const helper = {
    getEntity,
    getAll,
    getFiltered,
    isEmpty,
  };

  return helper;

  function arrayToMap<T extends Entity>(array: T[]) {
    const map = new Map<string, T>();

    for (const element of array) {
      map.set(element.id, element);
    }

    return map;
  }

  function isEmpty() {
    return map.size === 0;
  }

  function getEntity(id: string) {
    return map.get(id);
  }

  function getAll(): T[] {
    const array = [];

    for (const element of map.values()) {
      array.push(element);
    }

    return array;
  }

  function getFiltered(filter: (entity: T) => boolean) {
    const array = [];

    for (const element of map.values()) {
      if (filter(element)) {
        array.push(element);
      }
    }

    return array;
  }
}
