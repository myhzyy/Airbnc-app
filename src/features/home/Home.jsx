import Header from "../../components/Header";
import Properties from "../properties/Properties";

export default function Home({ filter, setFilter, user }) {
  return (
    <>
      <Header setFilter={setFilter} filter={filter} user={user} />
      <Properties setFilter={setFilter} filter={filter} />
    </>
  );
}
