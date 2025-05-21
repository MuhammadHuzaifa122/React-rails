import React from "react";

import ReactDOM from "react-dom/client";
import TodosList from "./components/TodosList";
import "@hotwired/turbo-rails";

document.addEventListener("turbo:load", () => {
  const container = document.getElementById("react-root");
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<TodosList />);
  }
});
