import { useEffect, useState } from "react";
import AboutThisSpaceModal from "./AboutThisSpaceModal";
import "./AboutThisSpace.css";

export default function AboutThisSpace() {
  const [showAboutThisSpace, setShowAboutThisSpace] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(true);

  const handleButtonClick = () => {
    setShowAboutThisSpace(!showAboutThisSpace);
    setisModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (!isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isModalOpen]);

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
