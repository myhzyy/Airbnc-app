import { useNavigate } from "react-router-dom";
import "./MenuSideBar.css";
import NotLoggedInSideBar from "./NotLoggedInSideBar";
import IsLoggedInSideBar from "./IsLoggedInSideBar"; // ✅ Capitalized properly

export default function MenuSideBar({ isOpen, onClose, setShowFilter, user }) {
  const navigate = useNavigate();

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
    onClose();
  };

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

        {user ? (
          <IsLoggedInSideBar onFilter={handleFilterClick} user={user} />
        ) : (
          <NotLoggedInSideBar
            onLogin={handleLoginRoute}
            onFilter={handleFilterClick}
          />
        )}
      </div>
    </>
  );
}
