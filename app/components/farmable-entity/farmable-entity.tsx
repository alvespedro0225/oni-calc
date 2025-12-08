import "~/css/farmable-entity.css";
import { useRef, useState } from "react";
import type { Farmable } from "~/common/models/farmable";
import ButtonIcon from "../button-icon";
import { DecreaseButton, IncreaseButton } from "~/common/constants";
import ProductionList from "./production-list";

export default function FarmableEntity({ entity }: { entity: Farmable }) {
  function increaseEntityCounter() {
    setEntityCounter((c) => c + 1);
  }

  function decreaseEntityCounter() {
    setEntityCounter((c) => Math.max(0, c - 1));
  }

  function increaseProductionCounter(id: string) {
    const old = productionCounter.get(id) ?? 0;
    const copy = new Map(productionCounter);
    copy.set(id, old + 1);
    setProductionCounter(copy);
    increaseEntityCounter();
  }

  function decreaseProductionCounter(id: string) {
    const old = productionCounter.get(id) ?? 0;
    const copy = new Map(productionCounter);
    copy.set(id, Math.max(0, old - 1));
    setProductionCounter(copy);

    if (old > 0) decreaseEntityCounter();
  }

  function getProductionCount(id: string) {
    return productionCounter.get(id) ?? 0;
  }

  function openDialog() {
    // workaround for testing since jsdom doesn't support dialog
    // https://github.com/jsdom/jsdom/issues/3294
    if (typeof dialogRef.current?.show === "function") {
      dialogRef.current?.show();
      return;
    }

    document.getElementsByTagName("dialog")[0].open = true;
  }

  const isMultiProducer = entity.production.length > 1;

  const [entityCounter, setEntityCounter] = useState(0);
  const [productionCounter, setProductionCounter] = useState(
    new Map<string, number>(),
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  const decreaseCallback = isMultiProducer ? openDialog : decreaseEntityCounter;
  const increaseCallback = isMultiProducer ? openDialog : increaseEntityCounter;

  return (
    <div className="farmable">
      <img alt="" src={`/${entity.imagePath}`} className="farmable-image" />
      {entity.name}
      <div className="counter-wrapper">
        <ButtonIcon
          callback={decreaseCallback}
          alt={DecreaseButton.alt}
          src={DecreaseButton.src}
        />
        <span className="normal-hover counter" aria-label="counter value">
          {entityCounter}
        </span>
        <ButtonIcon
          callback={increaseCallback}
          alt={IncreaseButton.alt}
          src={IncreaseButton.src}
        />
        {isMultiProducer && (
          <ProductionList
            productions={entity.production}
            ref={dialogRef}
            increaseCallback={increaseProductionCounter}
            decreaseCallback={decreaseProductionCounter}
            getCallback={getProductionCount}
          />
        )}
      </div>
    </div>
  );
}
