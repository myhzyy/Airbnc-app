import { useNavigate } from "react-router-dom";

export default function NotLoggedInSideBar({ onLogin, onFilter }) {
  const navigate = useNavigate();

  const handleContactUsClick = () => {
    navigate("/contactUs");
  };

  return (
    <ul>
      <li onClick={onLogin}>Log in!</li>
      <li onClick={onFilter}>Filter</li>
      <li onClick={handleContactUsClick}>Contact us!</li>
    </ul>
  );
}
