import { type Ref } from "react";
import type { Production } from "~/common/models/production";
import "~/css/production-list.css";
import "~/css/farmable-entity.css";
import ButtonIcon from "../button-icon";
import { DecreaseButton, IncreaseButton } from "~/common/constants";

export default function ProductionList({
  productions,
  ref,
  increaseCallback,
  decreaseCallback,
  getCallback,
}: {
  productions: Production[];
  ref: Ref<HTMLDialogElement>;
  increaseCallback: (prod: Production) => void;
  decreaseCallback: (prod: Production) => void;
  getCallback: (prod: string) => number;
}) {
  const sameOutput = all(productions, (p) => p === productions[0]);

  return (
    <dialog
      className="dialog"
      ref={ref}
      closedby="any"
      aria-label="possible inputs"
    >
      <ul className="production-list">
        {productions.map((prod) => (
          <li key={prod.id} className="production-item">
            {prod.input[0].id} {!sameOutput && `--> ${prod.output[0].id}`}
            <ButtonIcon
              callback={() => decreaseCallback(prod)}
              alt={DecreaseButton.alt}
              src={DecreaseButton.src}
            />
            <span className="normal-hover counter" aria-label="counter value">
              {getCallback(prod.id)}
            </span>
            <ButtonIcon
              callback={() => increaseCallback(prod)}
              alt={IncreaseButton.alt}
              src={IncreaseButton.src}
            />
          </li>
        ))}
      </ul>
    </dialog>
  );
}

function all<T>(array: T[], callback: (arg0: T) => boolean) {
  for (const element of array) {
    if (!callback(element)) return false;
  }
  return true;
}
