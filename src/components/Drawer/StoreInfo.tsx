type StoreInfoProps = {
  closeInfo: () => void;
};

function StoreInfo({ closeInfo }: StoreInfoProps) {
  return (
    <>
      <div className="store-info-card-header">
        <p>Store Information</p>
        <button className="close-button" onClick={closeInfo}>
          ×
        </button>
      </div>
      <section>
        <header className="store-info-header">
          <h2>Café Shop</h2>
          <p>Coffee and Tea</p>
        </header>
        <div className="store-info-address">
          <div className="store-info-title">Location</div>
          <p>123 Main St</p>
          <p>Sydney CBD, NSW 2000</p>
        </div>
        <div className="store-info-trading-hours">
          <div className="store-info-title">Trading Hours</div>
          <div className="store-info-trading-hours-content">
            <div className="hours-day">
              <p className="hours-day-name">Monday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p className="hours-day-name">Tuesday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p className="hours-day-name">Wednesday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p className="hours-day-name">Thursday - Saturday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p className="hours-day-name">Sunday </p>
              <p>Closed</p>
            </div>
          </div>
        </div>
        <div className="store-info-ordering-specifics">
          <div className="store-info-title">Ordering Specifics</div>
          <div className="store-info-ordering-specifics-content">
            <p>Pick-up</p>
            <p>Card surcharge 1.6%</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default StoreInfo;
