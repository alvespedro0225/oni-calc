import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Farmable } from "~/common/models/farmable";
import FarmableEntity from "~/components/farmable-entity/farmable-entity";

const entityMany: Farmable = {
  imagePath: "path0",
  name: "entity0",
  id: "0",
  production: [
    {
      id: "1",
      input: [
        {
          id: "2",
          value: 0,
        },
      ],
      output: [
        {
          id: "3",
          value: 0,
        },
      ],
    },
    {
      id: "4",
      input: [
        {
          id: "5",
          value: 0,
        },
      ],
      output: [
        {
          id: "6",
          value: 0,
        },
      ],
    },
  ],
};

const entitySingle: Farmable = {
  imagePath: "path0",
  name: "entity0",
  id: "0",
  production: [
    {
      id: "1",
      input: [
        {
          id: "2",
          value: 0,
        },
      ],
      output: [
        {
          id: "3",
          value: 0,
        },
      ],
    },
  ],
};

describe("the box for a farmable entity with a single production", () => {
  it("renders", () => {
    render(<FarmableEntity entity={entitySingle} />);
    expect(screen.getByText(entitySingle.name)).toBeTruthy();
  });

  it("doesn't render dialog", () => {
    render(<FarmableEntity entity={entitySingle} />);
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("increases the counter when + button clicked", async () => {
    render(<FarmableEntity entity={entitySingle} />);
    const user = userEvent.setup();
    const addButton = getAddButton();
    const initialValue = getCounterValue();
    await user.click(addButton);
    const newValue = getCounterValue();
    expect(newValue).toBe(initialValue + 1);
  });

  it("decreases the counter when - button clicked", async () => {
    render(<FarmableEntity entity={entitySingle} />);
    const user = userEvent.setup();
    const addButton = getAddButton();
    await user.click(addButton);
    const initialValue = getCounterValue();
    const subButton = getSubButton();
    await user.click(subButton);
    const newValue = getCounterValue();
    expect(newValue).toBe(initialValue - 1);
  });

  it("doesn't decrease the counter when the - button is clicked and the count is 0", async () => {
    render(<FarmableEntity entity={entitySingle} />);
    const user = userEvent.setup();
    const initialValue = getCounterValue();
    const subButton = getSubButton();
    await user.click(subButton);
    const newValue = getCounterValue();
    expect(newValue).toBe(initialValue);
  });
});

describe("the box for a farmable entity with multiple productions", () => {
  it("renders", () => {
    render(<FarmableEntity entity={entityMany} />);
    expect(screen.getByText(entityMany.name)).toBeTruthy();
  });

  it("doesn't render dialog", () => {
    render(<FarmableEntity entity={entityMany} />);
    expect(screen.queryByRole("dialog")).toBeFalsy();
  });

  it("opens a dialog when the + button is clicked", async () => {
    render(<FarmableEntity entity={entityMany} />);
    const user = userEvent.setup();
    const button = getAddButton();
    expect(screen.queryByRole("dialog")).toBeFalsy();
    await user.click(button);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  it("opens a dialog when the - button is clicked", async () => {
    render(<FarmableEntity entity={entityMany} />);
    const user = userEvent.setup();
    const button = getSubButton();
    expect(screen.queryByRole("dialog")).toBeFalsy();
    await user.click(button);
    expect(screen.getByRole("dialog")).toBeTruthy();
  });

  describe("the dialog interactions with the component", () => {
    it("increases the correct production on + click", async () => {
      render(<FarmableEntity entity={entityMany} />);
      const user = userEvent.setup();
      await openDialog(user);
      const button = getAddButtonMulti();
      const count = getCounterValueMulti();
      await user.click(button);
      expect(getCounterValueMulti()).toBe(count + 1);
      expect(getCounterValueMulti(0)).toBe(count + 1);
    });
  });

  it("decreases the correct production on - click", async () => {
    render(<FarmableEntity entity={entityMany} />);
    const user = userEvent.setup();
    await openDialog(user);
    const addButton = getAddButtonMulti();
    await user.click(addButton);
    const subButton = getSubButtonMulti();
    await user.click(subButton);
    expect(getCounterValueMulti()).toBe(0);
    expect(getCounterValueMulti(0)).toBe(0);
  });

  it("doesn't decrease from the main counter if production counter is 0", async () => {
    render(<FarmableEntity entity={entityMany} />);
    const user = userEvent.setup();
    await openDialog(user);
    const addButton = getAddButtonMulti();
    await user.click(addButton);
    const subButton = getSubButtonMulti(2);
    await user.click(subButton);
    expect(getCounterValueMulti()).toBe(1);
    expect(getCounterValueMulti(0)).toBe(1);
  });
});

function getCounterValue() {
  return Number(
    screen.getByRole("generic", { name: "counter value" }).textContent,
  );
}

function getCounterValueMulti(index = 1) {
  return Number(
    screen.getAllByRole("generic", { name: "counter value" })[index]
      .textContent,
  );
}

function getAddButton() {
  return screen.getByRole("button", { name: "increase" });
}

function getAddButtonMulti(index = 1) {
  return screen.getAllByRole("button", { name: "increase" })[index];
}

function getSubButton() {
  return screen.getByRole("button", { name: "decrease" });
}

function getSubButtonMulti(index = 1) {
  return screen.getAllByRole("button", { name: "decrease" })[index];
}

async function openDialog(user: UserEvent) {
  const button = getAddButton();
  await user.click(button);
}
