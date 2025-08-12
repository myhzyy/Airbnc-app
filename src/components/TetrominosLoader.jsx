import "./TetrominosLoader.css";

export default function terrominosLoader() {
  return (
    <>
      <div className="loading-overlay">
        <div className="loading-content">
          <div className="tetrominos">
            <div className="tetromino box1"></div>
            <div className="tetromino box2"></div>
            <div className="tetromino box3"></div>
            <div className="tetromino box4"></div>
          </div>
          <p className="loading-text">
            Loading everything for you... <br />
            Enjoy this animation for a second.
          </p>
        </div>
      </div>
    </>
  );
}
