import { useState } from "react";
import Header from "./components/Header";
import Properties from "./components/Properties";

function App() {
  const [filter, setFilter] = useState("");

  console.log(filter);

  return (
    <>
      <Header setFilter={setFilter} filter={filter} />
      <Properties setFilter={setFilter} filter={filter} />
    </>
  );
}

export default App;
