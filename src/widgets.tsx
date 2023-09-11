import React, { useState } from "react";
import "../src/widgets.css";
import HashWidget from "./hashWidget";
import AddressWidget from "./addressWidget";

interface WidgetProps {
  setShowWidget: React.Dispatch<React.SetStateAction<boolean>>;
  showWidget: boolean;
}

const Widget: React.FC<WidgetProps> = ({ showWidget, setShowWidget }) => {
  // Set the initial state to true (open)
  const [selectedOption, setSelectedOption] = useState("");

  const handleClose = () => {
    setShowWidget(false); // Set isOpen to false when the close button is clicked
  };

  const handleSearchButtonClick = () => {
    const select = document.querySelector("select");
    if (select) {
      const selectedValue = select.value;
      setSelectedOption(selectedValue);
    }
  };

  return (
    <div
      className={`search-widget ${showWidget ? "open" : "closed"}`}
      id="search-widget"
    >
      <div className="w-sec1-flex">
        <div style={{ color: "white" }}>Logo</div>
        <button className="close-button" onClick={() => handleClose()}>
          ✖
        </button>
      </div>
      <div>
        <div className="w-sec2-flex">
          <input
            type="text"
            placeholder=" Enter Address / Txn Hash "
            onChange={handleSearchButtonClick}
            className="search-input"
          />
          <select>
            <option value="option1">Select...</option>
            <option value="option2">Address</option>
            <option value="option3">Hashvalue</option>
          </select>
        </div>
        <div>
          <button className="search-button" onClick={handleSearchButtonClick}>
            Search
          </button>
        </div>
      </div>

      {selectedOption === "option2" && <AddressWidget />}
      {selectedOption === "option3" && <HashWidget />}
    </div>
  );
};

export default Widget;
