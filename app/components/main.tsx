import "../css/main.css";
import { Outlet } from "react-router";
import Navbar from "./navbar";
import { Orientation } from "~/common/enums";
import Results from "./results";

export default function Main() {
  const navOptions = [
    "buildings",
    "critters",
    "duplicants",
    "geysers",
    "plants",
    "recipes",
  ];

  return (
    <main className="main-page">
      <Navbar orientation={Orientation.HORIZONTAL} options={[navOptions]} />
      <Results />
      <Outlet />
    </main>
  );
}
