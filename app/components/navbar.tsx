import type { Orientation } from "~/common/enums";
import NavSection from "./nav-section";
import { redirect } from "react-router";

export default function Navbar({
  options,
  orientation,
}: {
  options: string[][];
  orientation: Orientation;
}) {
  return (
    <nav>
      {options.map((option, d) => (
        <NavSection key={d} options={option} orientation={orientation} />
      ))}
    </nav>
  );
}
