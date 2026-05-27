import { ThreeDot } from "react-loading-indicators";
import "./LoadingIndicator.scss";

export function LoadingIndicator() {
  return (
    <div className="loading-indicator">
      <ThreeDot color="#6d2145" />
    </div>
  );
}
