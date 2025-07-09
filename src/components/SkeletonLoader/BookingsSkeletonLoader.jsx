import "../SkeletonLoader/BookingsSkeletonLoader.css";

export default function BookingsSkeleton({ count = 3 }) {
  return (
    <div className="booking-skeleton-wrapper">
      {Array.from({ length: count }).map((_, i) => (
        <div className="booking-card skeleton" key={i}>
          <div className="booking-properties-info">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
          <div className="booking-properties-image skeleton-box" />
        </div>
      ))}
    </div>
  );
}
