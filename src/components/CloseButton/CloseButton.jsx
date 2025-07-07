import "./CloseButton.css";

export default function CloseButton({ onClick, label = "Close" }) {
  return (
    <p className="close-button" onClick={onClick}>
      {label}
    </p>
  );
}
