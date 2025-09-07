import { useEffect, useState } from "react";
import AboutThisSpaceModal from "./AboutThisSpaceModal";
import "./AboutThisSpace.css";

export default function AboutThisSpace({ onOpen }) {
  const [showAboutThisSpace, setShowAboutThisSpace] = useState(false); // opens model
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
      )) || (
        <p className="about-this-space-header" onClick={onOpen}>
          About this space
        </p>
      )}
    </div>
  );
}
