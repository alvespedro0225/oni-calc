import "../css/main.css";
import { Outlet } from "react-router";
import Navbar from "./navbar";
import { Dlc, NonDupeFoodVariant, Orientation } from "~/common/enums";
import Results from "./results";
import type { Critter } from "~/common/models/critter";

export default function Main() {
  const navOptions = [
    "buildings",
    "critters",
    "duplicants",
    "geysers",
    "plants",
    "recipes",
  ];

  const critters: Critter[] = [
    {
      name: "Hatch",
      id: "0",
      imagePath: "hatch.png",
      sheeding: null,
      drops: [],
      space: 12,
      maxAge: 100,
      baseReproduction: 60,
      baseIncubation: 20,
      dlc: Dlc.BASE,
      production: [
        {
          inputId: "0",
          inputValue: 0,
          foodType: {
            id: "0",
            variant: NonDupeFoodVariant.MATERIAL,
          },
          outputId: "1",
          outputValue: 0,
        },
        {
          inputId: "2",
          inputValue: 0,
          foodType: {
            id: "2",
            variant: NonDupeFoodVariant.MATERIAL,
          },
          outputId: "2",
          outputValue: 0,
        },
      ],
    },
  ];

  return (
    <main className="main-page">
      <Navbar orientation={Orientation.HORIZONTAL} options={[navOptions]} />
      <Results />
      <Outlet context={critters} />
    </main>
  );
}
