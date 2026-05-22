function StoreInfo() {
  return (
    <>
      <div>
        <h3>Store Information</h3>
      </div>
      <div>Google Maps</div>
      <section>
        <header className="store-info-header">
          <h2>Café Shop</h2>
          <p>Coffee and Tea</p>
        </header>
        <div className="store-info-trading-hours">
          <div className="store-info-title">Trading Hours</div>
          <div className="store-info-trading-hours-content">
            <div className="hours-day">
              <p>Monday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p>Tuesday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p>Wednesday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p>Thursday - Saturday </p>
              <p>7:30am to 4:00pm</p>
            </div>
            <div className="hours-day">
              <p>Sunday </p>
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
