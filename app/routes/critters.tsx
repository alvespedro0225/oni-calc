import "~/css/critters.css";
import { useOutletContext } from "react-router";
import type { Critter } from "~/common/models/critter";
import FarmableEntity from "~/components/farmable-entity/farmable-entity";

export default function Critters() {
  const critters = useOutletContext<Critter[]>();
  if (critters.length === 0) {
    return <span>No critters!</span>;
  }
  return (
    <ul className="critter-list">
      {critters.map((critter) => (
        <li key={critter.id}>
          <FarmableEntity entity={critter} />
        </li>
      ))}
    </ul>
  );
}
