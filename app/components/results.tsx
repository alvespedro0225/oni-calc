import "../css/results.css";
import type { ResultHelper } from "~/common/models/results";

export default function Results({ result }: { result: ResultHelper }) {
  const mats = [];

  // not mapping cause maps push "false" into "mats" when value == 0,
  // which makes "mats.length" not work for checking if there is nothing to display
  for (const [id, value] of result.getValues()) {
    if (value === 0) continue;

    mats.push(<span>{`${id} --> ${value}`}</span>);
  }

  if (mats.length === 0) return <span>No results!</span>;
  return <div className="results">{mats}</div>;
}
