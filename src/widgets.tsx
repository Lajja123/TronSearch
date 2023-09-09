import React, { useState } from "react";
import "../src/widgets.css";
import HashWidget from "./hashWidget";
import AddressWidget from "./addressWidget";

const Widget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleClose = () => {
    setIsOpen(true);
  };

  const handleSearchButtonClick = () => {
    const select = document.querySelector("select");
    if (select) {
      const selectedValue = select.value;
      setSelectedOption(selectedValue);
    }
  };

  return (
    <div className={`search-widget ${isOpen ? "open" : "closed"}`}>
      <div className="w-sec1-flex">
        <div>Logo</div>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
      <div className="w-sec2-flex">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchButtonClick}
        />
        <select>
          <option value="option1">Select...</option>
          <option value="option2">Address</option>
          <option value="option3">Hashvalue</option>
        </select>

        <button className="search-button" onClick={handleSearchButtonClick}>
          Search
        </button>
      </div>
      {selectedOption === "option2" && <AddressWidget />}
      {selectedOption === "option3" && <HashWidget />}
    </div>
  );
};

export default Widget;
