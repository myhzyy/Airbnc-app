import Header from "./Header";
import Properties from "./Properties";

export default function Home({ filter, setFilter }) {
  return (
    <>
      <Header setFilter={setFilter} filter={filter} />
      <Properties setFilter={setFilter} filter={filter} />
    </>
  );
}
