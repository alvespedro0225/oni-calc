import { render, screen } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Orientation } from "~/common/enums";
import { getRange as range } from "~/common/functions";
import NavSection from "~/components/navbar/nav-section";

const items = ["apple", "orange", "banana"];
const orientation = Orientation.HORIZONTAL;
const nav = (
  <BrowserRouter>
    <NavSection options={items} orientation={orientation} />
  </BrowserRouter>
);

function getUrl() {
  return window.location.href;
}

function getNavbar() {
  return screen.getByRole("list");
}

describe("a section of links in the navbar", () => {
  it("renders", () => {
    render(nav);

    expect(getNavbar().children.length).toBe(items.length);
  });

  it("diplays correct items", () => {
    render(nav);
    const navbar = getNavbar();

    for (const i of range(0, navbar.children.length)) {
      expect(navbar.children.item(i)?.textContent).toBe(items[i]);
    }
  });
});

describe("individual item on the section", () => {
  it("changes route when clicked", async () => {
    render(nav);
    const user = userEvent.setup();
    const currentUrl = getUrl();
    const anchor = screen.getByRole("link", { name: items[0] });
    await user.click(anchor);
    expect(getUrl() === currentUrl).toBeFalsy();
  });
});
