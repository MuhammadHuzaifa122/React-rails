import ReactDOM from "react-dom/client";
import Hello from "./components/Hello";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("react-root");
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<Hello />);
  }
});
