export type Helper<T> = {
  getEntity: (id: string) => T | undefined;
  getAll: () => T[];
  getFiltered: (filter: (entity: T) => boolean) => T[];
  isEmpty: () => boolean;
};
