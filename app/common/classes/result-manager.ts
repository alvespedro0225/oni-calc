export class ResultManager {
  private counter: Map<string, number> = new Map();

  clone() {
    const clone = { ...this };
    return clone;
  }

  add(id: string, value: number) {
    const cur = this.get(id);
    this.counter.set(id, cur + value);
  }

  sub(id: string, value: number) {
    const cur = this.get(id);
    this.counter.set(id, cur - value);
  }

  get(id: string) {
    return this.counter.get(id) ?? 0;
  }
}
