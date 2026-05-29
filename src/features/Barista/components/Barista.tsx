import "./Barista.scss";
import { CloseButton } from "../../../global/ui/closeButton";

type BaristaProps = {
  closeBaristaPanel: () => void;
};

function Barista({ closeBaristaPanel }: BaristaProps) {
  return (
    <>
      <div className="barista-card-header">
        <h2>Barista Panel</h2>
        <CloseButton onCloseButton={closeBaristaPanel} />
      </div>
      <div className="barista-function-list">
        <p>To be implemented...</p>
      </div>
    </>
  );
}

export default Barista;
