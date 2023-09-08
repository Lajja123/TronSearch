import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Widget from "./widgets";

function App() {
  const [showWidget, setShowWidget] = useState(false);

  const openWidget = () => {
    setShowWidget(!showWidget);
  };

  return (
    <div className="App">
      <div className="home-page">
        <button className="search-btn" onClick={openWidget}>
          Click
        </button>
        {showWidget && <Widget />}
      </div>
    </div>
  );
}

export default App;
