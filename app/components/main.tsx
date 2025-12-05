import "../css/main.css";
import { Outlet } from "react-router";
import Navbar from "./navbar";
import { Orientation } from "~/common/enums/orientation";
import Results from "./results";

export default function Main() {
  const children = ["critters", "plants"];
  return (
    <main className="main-page">
      <Navbar orientation={Orientation.HORIZONTAL} options={[children]} />
      <Results />
      <Outlet />
    </main>
  );
}
