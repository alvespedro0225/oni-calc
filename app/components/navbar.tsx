import type { Orientation } from "~/common/enums";
import NavSection from "./nav-section";

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
