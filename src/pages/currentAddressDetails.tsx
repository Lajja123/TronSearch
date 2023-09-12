import React, { useState } from "react";
import addData from "../json/address";
import "../style/address.css";

interface HashDetailsProps {
  hash: string;
}

function truncateAddress(address: string): string {
  if (address.length <= 15) {
    return address;
  }

  const start = address.slice(0, 8);
  const end = address.slice(address.length - 8, address.length);

  return `${start}...${end}`;
}

const CurrentAddressDetails: React.FC = () => {
  return (
    <div className="hash-value-widget">
      <div className="title">Address Details</div>
      <div className="hash-details-main">
        <div className="info-item">
          <div className="info-lable ">Address:</div>
          <div className="info-response-data add-color">
            {" "}
            {truncateAddress(addData.adddress)}
          </div>
        </div>
        <div className="info-item">
          <div className="info-lable">Balance:</div>
          <div className="info-response-data result-color">
            {addData.balance}
          </div>
        </div>
        <div className="info-item">
          <div className="info-lable">Create_Time:</div>
          <div className="info-response-data">{addData.time}</div>
        </div>
        <div className="info-item">
          <div className="info-lable">Bandwidth:</div>
          <div className="info-response-data">{addData.bandwidth}</div>
        </div>
        <div className="info-item">
          <div className="info-lable">Allounce:</div>
          <div className="info-response-data">{addData.allounce}</div>
        </div>
        <div className="info-item">
          <div className="info-lable">Energy:</div>
          <div className="info-response-data">{addData.energy}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAddressDetails;
