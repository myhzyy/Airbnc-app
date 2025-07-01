import { useNavigate } from "react-router-dom";
import "./MenuSideBar.css";

export default function MenuSideBar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLoginRoute = () => {
    navigate("/login");
    onClose();
  };

  return (
    <>
      <div
        className={`sidebarOverlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`sideBarContainer ${isOpen ? "open" : ""}`}>
        <button onClick={onClose}>×</button>
        <ul>
          <li onClick={handleLoginRoute}>Log in!</li>
          <li>Filter</li>
          <li>Contact us!</li>
        </ul>
      </div>
    </>
  );
}
