import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NonDupeFoodVariant } from "~/common/enums";
import type { Farmable } from "~/common/models/farmable";
import FarmableEntity from "~/components/farmable-entity/farmable-entity";

const entityMany: Farmable = {
  imagePath: "path0",
  name: "entity0",
  id: "0",
  production: [
    {
      inputId: "1",
      inputValue: 0,
      foodType: {
        id: "2",
        variant: NonDupeFoodVariant.MATERIAL,
      },
      outputId: "3",
      outputValue: 0,
    },
    {
      inputId: "4",
      inputValue: 0,
      foodType: {
        id: "5",
        variant: NonDupeFoodVariant.MATERIAL,
      },
      outputId: "6",
      outputValue: 0,
    },
  ],
};

const entitySingle: Farmable = {
  imagePath: "path0",
  name: "entity0",
  id: "0",
  production: [
    {
      inputId: "1",
      inputValue: 0,
      foodType: {
        id: "2",
        variant: NonDupeFoodVariant.MATERIAL,
      },
      outputId: "3",
      outputValue: 0,
    },
  ],
};

describe("the box for a single farmable entity", () => {
  it("renders", () => {
    render(<FarmableEntity entity={entityMany} />);
    expect(screen.getByText(entityMany.name)).toBeTruthy();
  });

  it("doesn't render dialog", () => {
    render(<FarmableEntity entity={entityMany} />);
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("increases the counter when + button clicked and there's only one production", async () => {
    render(<FarmableEntity entity={entitySingle} />);
    const user = userEvent.setup();
    const addButton = screen.getByRole("button", { name: "increase" });
    const initialValue = getCounterValue();
    await user.click(addButton);
    const newValue = getCounterValue();
    expect(newValue).toBe(initialValue + 1);
  });

  it("decreases the counter when - button clicked, there's only one production and the counter is more than 0", async () => {
    render(<FarmableEntity entity={entitySingle} />);
    const user = userEvent.setup();
    const addButton = screen.getByRole("button", { name: "increase" });
    await user.click(addButton);
    const initialValue = getCounterValue();
    const subButton = screen.getByRole("button", { name: "decrease" });
    await user.click(subButton);
    const newValue = getCounterValue();
    expect(newValue).toBe(initialValue - 1);
  });

  it("doesn't decrease the counter when the - button is clicked and is 0 on a single producer", async () => {
    render(<FarmableEntity entity={entitySingle} />);
    const user = userEvent.setup();
    const initialValue = getCounterValue();
    const subButton = screen.getByRole("button", { name: "decrease" });
    await user.click(subButton);
    const newValue = getCounterValue();
    expect(newValue).toBe(initialValue);
  });
});

function getCounterValue() {
  return Number(
    screen.getByRole("generic", { name: "counter value" }).textContent,
  );
}
