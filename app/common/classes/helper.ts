import type { Entity } from "./entity";

export class Helper<T extends Entity> {
  private map: Map<string, T>;
  constructor(array: T[]) {
    const map = new Map<string, T>();

    for (const element of array) {
      map.set(element.id, element);
    }

    this.map = map;
  }

  getSingle(id: string) {
    return this.map.get(id);
  }

  getAll() {
    const array = [];

    for (const element of this.map.values()) {
      array.push(element);
    }

    return array;
  }

  getFiltered(filter: (entity: T) => boolean) {
    const array = [];

    for (const element of this.map.values()) {
      if (filter(element)) {
        array.push(element);
      }
    }

    return array;
  }

  isEmpty() {
    return this.map.size === 0;
  }
}
