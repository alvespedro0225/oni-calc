import type { Ref } from "react";
import type { Production } from "~/common/models/production";
import "~/css/production-list.css";
import "~/css/farmable-entity.css";
import ButtonIcon from "./button-icon";
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
  increaseCallback: (prod: string) => void;
  decreaseCallback: (prod: string) => void;
  getCallback: (prod: string) => number;
}) {
  const sameOutput = all(productions, (p) => p === productions[0]);
  return (
    <dialog className="dialog" ref={ref} closedby="any">
      <ul className="production-list">
        {productions.map((prod) => (
          <li key={prod.inputId} className="production-item">
            {"input"} {!sameOutput && "--> output"}
            <ButtonIcon
              callback={() => decreaseCallback(prod.inputId)}
              alt={DecreaseButton.alt}
              src={DecreaseButton.src}
            />
            <span className="normal-hover counter">
              {getCallback(prod.inputId)}
            </span>
            <ButtonIcon
              callback={() => increaseCallback(prod.inputId)}
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
