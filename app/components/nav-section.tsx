import type { Orientation } from "~/common/enums";
import "../css/nav-section.css";
import { NavLink } from "react-router";

export default function NavSection({
  options,
  orientation,
}: {
  options: string[];
  orientation: Orientation;
}) {
  const classes = ["nav-section", orientation];

  return (
    <ul className={classes.join(" ")}>
      {options.map((name) => (
        <li className="nav-item" key={name}>
          <NavLink to={`/${name}`}>{name}</NavLink>
        </li>
      ))}
    </ul>
  );
}
