import React, { useEffect, useState } from "react";
import jsonData from "../json/hash";
import "../style/hash.css";

interface AddressWidgetProps {
  inputValue: string; // Define the prop here
}
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

const HashWidget: React.FC<AddressWidgetProps> = ({ inputValue }) => {
  const [transactionData, setTransactionData] = useState<any>();
  const [transactionInfo, setTransactionInfo] = useState<any>();

  const getTransactionData = async () => {
    try {
      // call the api to get the transaction data
      const response = await fetch(
        "https://api.trongrid.io/wallet/gettransactionbyid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: inputValue,
            visible: true,
          }),
        }
      );
      const resData = await response.json();
      console.log(resData);
      setTransactionData(resData);

      const txResponse = await fetch(
        "https://api.trongrid.io/wallet/gettransactioninfobyid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: inputValue,
          }),
        }
      );
      const txResData = await txResponse.json();
      console.log(txResData);
      setTransactionInfo(txResData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  if (transactionData && transactionInfo) {
    return (
      <div className="hash-value-widget">
        <div className="title">Hash Details</div>
        <div className="hash-details-main">
          <div className="info-item">
            <div className="info-lable ">Tx Hash:</div>
            <div className="info-response-data add-color"> {inputValue}</div>
          </div>
          <div className="info-item">
            <div className="info-lable">Result:</div>
            <div className="info-response-data result-color">
              {transactionData.ret[0].contractRet
                ? transactionData.ret[0].contractRet
                : "NA"}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Block:</div>
            <div className="info-response-data">
              {transactionInfo.blockNumber ? transactionInfo.blockNumber : "NA"}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Time:</div>
            <div className="info-response-data">
              {transactionData.raw_data.timestamp
                ? transactionData.raw_data.timestamp
                : "NA"}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Fee:</div>
            <div className="info-response-data">
              {transactionInfo.fee ? transactionInfo.fee : "NA"}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Value:</div>
            <div className="info-response-data">
              {transactionData.raw_data.contract[0].parameter.value.amount
                ? transactionData.raw_data.contract[0].parameter.value.amount
                : transactionData.raw_data.contract[0].parameter.value
                    .call_value}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Owner address:</div>
            <div className="info-response-data">
              {transactionData.raw_data.contract[0].parameter.value
                .owner_address
                ? truncateAddress(
                    transactionData.raw_data.contract[0].parameter.value
                      .owner_address
                  )
                : "NA"}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">
              {transactionData.raw_data.contract[0].parameter.value.to_address
                ? "To address:"
                : "contract address"}
            </div>
            <div className="info-response-data">
              {transactionData.raw_data.contract[0].parameter.value.to_address
                ? truncateAddress(
                    transactionData.raw_data.contract[0].parameter.value
                      .to_address
                  )
                : truncateAddress(
                    transactionData.raw_data.contract[0].parameter.value
                      .contract_address
                  )}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Transaction action:</div>
            <div className="info-response-data">
              {transactionData.raw_data.contract[0].type
                ? transactionData.raw_data.contract[0].type
                : "NA"}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default HashWidget;
