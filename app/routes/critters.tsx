import "~/css/critters.css";
import { useOutletContext } from "react-router";
import type { Critter } from "~/common/models/critter";
import FarmableEntity from "~/components/farmable-entity/farmable-entity";
import type { OutletContext } from "~/common/models/outlet-context";
import type { Helper } from "~/common/models/helper";
import type { Production } from "~/common/models/production";

export default function Critters() {
  const ctx = useOutletContext<OutletContext>();
  const critterHelper: Helper<Critter> = ctx.critters;
  const result = ctx.result;

  function addCallback(prod: Production, id: string) {
    const critter = critterHelper.getEntity(id);

    if (critter == undefined) throw Error("Unknown critter");

    prod.input.map(({ id, value }) => {
      result.subMaterial(id, value);
    });

    prod.output.map(({ id, value }) => {
      result.addMaterial(id, value);
    });

    critter.drops.map(({ id, value }) => {
      result.addMaterial(id, value / critter.baseReproduction);
    });

    result.addMaterial(critter.eggId, 1 / critter.baseReproduction);
  }

  function subCallback(prod: Production, id: string) {
    const critter = critterHelper.getEntity(id);

    if (critter == undefined) throw Error("Unkown critter");

    prod.input.map(({ id, value }) => {
      result.addMaterial(id, value);
    });

    prod.output.map(({ id, value }) => {
      result.subMaterial(id, value);
    });

    critter.drops.map(({ id, value }) => {
      result.subMaterial(id, value);
    });

    result.subMaterial(critter.eggId, 1 / critter.baseReproduction);
  }

  if (critterHelper.isEmpty()) {
    return <span>No critters!</span>;
  }

  return (
    <ul className="critter-list">
      {critterHelper.getAll().map((critter) => (
        <li key={critter.id}>
          <FarmableEntity
            entity={critter}
            addCallback={addCallback}
            subCallback={subCallback}
          />
        </li>
      ))}
    </ul>
  );
}
