import "~/css/critters.css";
import { useOutletContext } from "react-router";
import type { Critter } from "~/common/models/critter";
import FarmableEntity from "~/components/farmable-entity/farmable-entity";
import type { Helper } from "~/common/models/helper";
import { Loading } from "~/components/loading";
import type { OutletContext } from "~/common/models/outlet-context";

export default function Critters() {
  const critters = useOutletContext<OutletContext>().critters;

  if (critters == undefined) {
    return <Loading />;
  }

  if (critters.isEmpty()) {
    return <span>No critters!</span>;
  }
  return (
    <ul className="critter-list">
      {critters.getAll().map((critter) => (
        <li key={critter.id}>
          <FarmableEntity entity={critter} />
        </li>
      ))}
    </ul>
  );
}
