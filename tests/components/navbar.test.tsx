import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Orientation } from "~/common/enums";
import Navbar from "~/components/navbar/navbar";

const travelLinks = ["home", "gifs", "images"];
const settingsLinks = ["help", "about", "settings"];
const allLinks = [travelLinks, settingsLinks];
// add to this if any sections that are not passed by props are added
// e. g. add a logo
const staticChildren = 0;

describe("navbar", () => {
  it("renders", () => {
    render(makeNavbar());
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeTruthy();
  });

  it("creates all sections properly", () => {
    render(makeNavbar());
    const navbar = screen.getByRole("navigation");
    expect(navbar.children.length).toBe(allLinks.length + staticChildren);
  });
});

function makeNavbar(
  links: string[][] = allLinks,
  orientation = Orientation.HORIZONTAL,
) {
  return (
    <MemoryRouter>
      <Navbar options={links} orientation={orientation} />;
    </MemoryRouter>
  );
}
