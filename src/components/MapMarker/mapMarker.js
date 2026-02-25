import "./mapMarker.css";

export default function MapMarker({ frequency }) {
  return <div className={`mapMarker ${frequency}`}>{frequency}</div>;
}