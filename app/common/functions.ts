export function* getRange(start: number = 0, end: number): Generator<number> {
  for (let i = start; i < end; i++) {
    yield i;
  }
}
