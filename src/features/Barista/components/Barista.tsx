import "./Barista.scss";

type BaristaProps = {
  closeBaristaPanel: () => void;
};

function Barista({ closeBaristaPanel }: BaristaProps) {
  return (
    <>
      <div className="barista-card-header">
        <h2>Barista Panel</h2>
        <button className="close-button" onClick={closeBaristaPanel}>
          ×
        </button>
      </div>
      <div className="barista-function-list">
        <p>To be implemented...</p>
      </div>
    </>
  );
}

export default Barista;