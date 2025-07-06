import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      <FiArrowLeft className="back-button-click" size={20} />
    </button>
  );
}
