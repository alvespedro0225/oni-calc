import { useOutletContext } from "react-router";
import type { Critter } from "~/common/models/critter";
import FarmableItem from "~/components/farmable-entity";

export default function Critters() {
  const critters = useOutletContext<Critter[]>();
  if (critters.length === 0) {
    return <span>No critters!</span>;
  }
  return critters.map((critter) => (
    <FarmableItem item={critter} key={critter.id} />
  ));
}
