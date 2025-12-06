import "~/css/button-icon.css";

export default function ButtonIcon({
  callback,
  alt,
  src,
}: {
  callback: () => void;
  alt: string;
  src: string;
}) {
  return (
    <button className="button-icon" onClick={callback}>
      <img className="icon-svg" alt={alt} src={src}></img>
    </button>
  );
}
