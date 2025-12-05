import { describe, expect, vi, it } from "vitest";
import { getRange } from "~/common/functions";

const start = 0;
const end = 10;
const range = () => getRange(start, end);

describe("range", () => {
  it("ends", () => {
    for (const i of range());

    expect(true).toBe(true);
  });

  it("executes the correct amount of times", () => {
    const mock = vi.fn();

    for (const _ of range()) {
      mock();
    }

    expect(mock).toHaveBeenCalledTimes(end - start);
  });
});
