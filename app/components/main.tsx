import "../css/main.css";
import { Outlet } from "react-router";
import Navbar from "./navbar/navbar";
import { Orientation } from "~/common/enums";
import Results from "./results";
import type { Critter } from "~/common/models/critter";
import { useHelper } from "~/common/hooks/useHelper";
import { useResults } from "~/common/hooks/useResults";

export default function Main({ crittersArray }: { crittersArray: Critter[] }) {
  const navOptions = [
    "buildings",
    "critters",
    "duplicants",
    "geysers",
    "plants",
    "recipes",
  ];

  const critters = useHelper(crittersArray);
  const result = useResults();

  return (
    <main className="main-page">
      <Navbar orientation={Orientation.HORIZONTAL} options={[navOptions]} />
      <Results result={result} />
      <Outlet context={{ critters, result }} />
    </main>
  );
}
