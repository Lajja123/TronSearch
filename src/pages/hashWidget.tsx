import React, { useState } from "react";
import jsonData from "../json/hash";
import "../style/hash.css";

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
const HashWidget: React.FC = () => {
  return (
    <div className="hash-value-widget">
      <div className="title">Hash Details</div>
      <div className="hash-details-main">
        <div className="info-item">
          <div className="info-lable ">Tx Hash:</div>
          <div className="info-response-data add-color">
            {" "}
            {truncateAddress(jsonData.Hash)}
          </div>
        </div>
        <div className="info-item">
          <div className="info-lable">Result:</div>
          <div className="info-response-data result-color">
            {jsonData.Result}
          </div>
        </div>
        <div className="info-item">
          <div className="info-lable">Block:</div>
          <div className="info-response-data">{jsonData.Block}</div>
        </div>
        <div className="info-item">
          <div className="info-lable">Time:</div>
          <div className="info-response-data">{jsonData.Time}</div>
        </div>
        <div className="info-item">
          <div className="info-lable">Fee:</div>
          <div className="info-response-data">{jsonData.Fee}</div>
        </div>
        <div className="info-item">
          <div className="info-lable">Value:</div>
          <div className="info-response-data">{jsonData.Value}</div>
        </div>
        <div className="info-item">
          <div className="info-lable">Owner address:</div>
          <div className="info-response-data">
            {truncateAddress(jsonData.OwnerAddress)}
          </div>
        </div>
        <div className="info-item">
          <div className="info-lable">Contract address:</div>
          <div className="info-response-data">
            {truncateAddress(jsonData.ContractAddress)}
          </div>
        </div>
        <div className="info-item">
          <div className="info-lable">Transaction action:</div>
          <div className="info-response-data">{jsonData.TransactionAction}</div>
        </div>
      </div>
    </div>
  );
};

export default HashWidget;
