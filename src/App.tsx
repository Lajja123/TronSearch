import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Widget from "./pages/widgets";

function App() {
  const [showWidget, setShowWidget] = useState(false);

  const openWidget = () => {
    setShowWidget(true);
  };

  return (
    <div className="App">
      <div className="home-page">
        <button className="search-btn" onClick={openWidget}>
          Click
        </button>

        {showWidget && (
          <Widget showWidget={showWidget} setShowWidget={setShowWidget} />
        )}
      </div>
    </div>
  );
}

export default App;
