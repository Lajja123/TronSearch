import React, { useState } from "react";
import "../style/widgets.css";
import HashWidget from "./hashWidget";
import AddressWidget from "./addressWidget";
import CurrentAddressDetails from "./currentAddressDetails";
interface WidgetProps {}

const Widget: React.FC<WidgetProps> = () => {
  const [showWidget, setShowWidget] = useState<boolean>(false);

  const openWidget = () => {
    setShowWidget(true);
  };
  // Set the initial state to true (open)
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showDefaultWidgets, setShowDefaultWidgets] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");

  const handleClose = () => {
    setShowWidget(false); // Set isOpen to false when the close button is clicked
  };

  const handleSearchButtonClick = () => {
    const select = document.querySelector("select");
    if (select) {
      const selectedValue = select.value;
      setSelectedOption(selectedValue);
      setShowDefaultWidgets(false); // Hide default widgets when an option is selected
    }
  };

  return (
    <>
      <button className="search-btn" onClick={openWidget}>
        CLICK
      </button>
      {showWidget ? (
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
                id="inputText"
                placeholder=" Enter Address / Txn Hash "
                onChange={(e) => setInputValue(e.target.value)}
                className="search-input"
                value={inputValue}
              />
              <select>
                <option value="option1">Select...</option>
                <option value="option2">Address</option>
                <option value="option3">Hashvalue</option>
              </select>
              
              <button
                className="search-button"
                onClick={handleSearchButtonClick}
              >
                Search
              </button>
            
            </div>
            
          </div>

          {showDefaultWidgets && <CurrentAddressDetails />}

          {selectedOption === "option2" && !showDefaultWidgets && (
            <AddressWidget inputValue={inputValue} />
          )}
          {selectedOption === "option3" && !showDefaultWidgets && (
            <HashWidget inputValue={inputValue} />
          )}
          <div style={{padding:"10px 0px", backgroundColor:"#20293a",fontSize:"10px",color:"white"}}>Powerd by Explorex</div>
        </div>
        
      ) : null}
      
    </>
  );
};

export default Widget;
