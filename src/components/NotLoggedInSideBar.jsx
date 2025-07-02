// MenuList.jsx
export default function NotLoggedInSideBar({ onLogin, onFilter }) {
  return (
    <ul>
      <li onClick={onLogin}>Log in!</li>
      <li onClick={onFilter}>Filter</li>
      <li>Contact us!</li>
    </ul>
  );
}
``;
