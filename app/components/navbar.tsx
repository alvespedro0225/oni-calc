import type { Orientation } from "~/common/enums/orientation";
import NavSection from "./nav-section";
import { redirect } from "react-router";

export default function Navbar({
  options,
  orientation,
}: {
  options: string[][];
  orientation: Orientation;
}) {
  function changeRoute(newRoute: string) {
    redirect(`/${newRoute}`);
  }

  return (
    <nav>
      {options.map((option, d) => (
        <NavSection
          key={d}
          options={option}
          orientation={orientation}
          callback={changeRoute}
        />
      ))}
    </nav>
  );
}
