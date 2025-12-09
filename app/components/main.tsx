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
  const [addMaterial, subMaterial, getValues] = useResults();
  const result = {
    addMaterial,
    subMaterial,
    getValues,
  };

  return (
    <main className="main-page">
      <Navbar orientation={Orientation.HORIZONTAL} options={[navOptions]} />
      <Results />
      <Outlet context={{ critters, result }} />
    </main>
  );
}
