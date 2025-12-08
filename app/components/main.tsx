import "../css/main.css";
import { Outlet } from "react-router";
import Navbar from "./navbar/navbar";
import { Orientation } from "~/common/enums";
import Results from "./results";
import { useGet } from "~/common/functions";
import type { Critter } from "~/common/models/critter";
import { useState } from "react";
import { ResultManager } from "~/common/classes/result-manager";

export default function Main() {
  const navOptions = [
    "buildings",
    "critters",
    "duplicants",
    "geysers",
    "plants",
    "recipes",
  ];

  const [res, setRes] = useState(new ResultManager());
  const critters = useGet<Critter>("http://localhost:3000/critters").helper;
  const result = { results: res, setResults: setRes };
  return (
    <main className="main-page">
      <Navbar orientation={Orientation.HORIZONTAL} options={[navOptions]} />
      <Results />
      <Outlet context={{ critters, result }} />
    </main>
  );
}
