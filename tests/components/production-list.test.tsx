import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NonDupeFoodVariant } from "~/common/enums";
import type { Production } from "~/common/models/production";
import ProductionList from "~/components/farmable-entity/production-list";

const productions: Production[] = [
  {
    inputId: "0",
    inputValue: 0,
    foodType: {
      id: "1",
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
];

const unused = () => {};

describe("the model that opens for multi producers", () => {
  it("calls increase function when + button is clicked", async () => {
    const mock = vi.fn();
    setup(mock);
    const user = userEvent.setup();
    const button = getAddButton()[0];
    await user.click(button);
    expect(mock).toBeCalledTimes(1);
  });

  it("calls decrease function when - button is clicked", async () => {
    const mock = vi.fn();
    setup(unused, mock);
    const user = userEvent.setup();
    const button = getSubButton()[0];
    await user.click(button);
    expect(mock).toBeCalledTimes(1);
  });

  it("calls get funcion on creation", async () => {
    const mock = vi.fn();
    setup(unused, unused, mock);
    expect(mock).toBeCalledTimes(productions.length);
  });
});

function setup(
  increaseMock: any = () => {},
  decreaseMock: any = () => {},
  getMock: any = () => {},
) {
  render(
    <ProductionList
      productions={productions}
      ref={null}
      increaseCallback={increaseMock}
      decreaseCallback={decreaseMock}
      getCallback={getMock}
    />,
  );
  document.getElementsByTagName("dialog")[0].open = true;
}

function getAddButton() {
  return screen.getAllByRole("button", { name: "increase" });
}

function getSubButton() {
  return screen.getAllByRole("button", { name: "decrease" });
}
