import "./AboutThisSpaceModal.css";

export default function AboutThisSpaceModal({
  setShowAboutThisSpace,
  handleButtonClick,
}) {
  return (
    <div className="modal-card">
      <div className="modal-card-container">
        <button className="modal-button" onClick={handleButtonClick}>
          x
        </button>

        <h4 className="modal-card-title">About this space</h4>
        <br></br>
        <p>
          Escape to this charming 1-bedroom flat, perfect for two adults. Enjoy
          stunning sea views from the private balcony and relax just steps from
          Newquay's golden beaches, with the nearest beach only a 3-minute walk
          away. Conveniently located in the heart of town, you'll find shops,
          bars, restaurants, a cinema, and supermarkets all within walking
          distance. Whether it’s a romantic getaway or a seaside adventure, this
          cosy retreat offers everything you need for a memorable stay in
          Cornwall.
        </p>

        <section className="modal-section">
          <h3>The space</h3>
          <ul>
            Beautiful Balcony: The highlight of the flat, offering the perfect
            spot to enjoy morning coffee with a sunrise view.
          </ul>

          <ul>
            Open Living, Dining & Kitchen Area: A bright and airy space perfect
            for unwinding, complete with modern furnishings and a fully equipped
            kitchen.
          </ul>

          <ul>
            1 Sleek Bathroom: A contemporary space with a refreshing shower.
          </ul>
        </section>

        <section className="modal-section">
          <h3>Guest access</h3>

          <ul>
            The building is accessible from the street, with keys available in a
            ground-floor lock-box. The flat door entrance uses a keypad to
            enter. There's 3 flights of stairs with no lift.
          </ul>
        </section>

        <section className="modal-section">
          <h3>Location</h3>

          <ul>
            While the property is in a fantastic location close to all of the
            town’s main amenities, being in the heart of the action means you
            might hear the distant sounds of The Dead Famous bar and nightclub,
            as well as late-night wanderers passing by along the high street.
            This is usually during the weekends.
          </ul>

          <ul>
            It's a 3 minute walk to Towan Beach and a 20 minute walk to Fistral
            Beach.
          </ul>

          <ul>Newquay airport is a 20 minute drive away.</ul>
        </section>
      </div>
    </div>
  );
}

// add x to close modal
