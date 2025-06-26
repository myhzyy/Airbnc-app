import { useState } from "react";
import Header from "./components/Header";
import Properties from "./components/Properties";
import SubHeader from "./components/SubHeader";

function App() {
  const [gen, setGen] = useState(1);

  return (
    <>
      <Header />
      <SubHeader />
      <Properties />
    </>
  );
}

export default App;
