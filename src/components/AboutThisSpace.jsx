import { useState } from "react";
import AboutThisSpaceModal from "./AboutThisSpaceModal";
import "./AboutThisSpace.css";

export default function AboutThisSpace() {
  const [showAboutThisSpace, setShowAboutThisSpace] = useState(false);

  const handleButtonClick = () => {
    setShowAboutThisSpace(!showAboutThisSpace);
  };

  return (
    <div onClick={handleButtonClick}>
      {(showAboutThisSpace && (
        <AboutThisSpaceModal
          setShowAboutThisSpace={setShowAboutThisSpace}
          handleButtonClick={handleButtonClick}
        />
      )) || <p className="about-this-space-header">About this space</p>}
    </div>
  );
}
