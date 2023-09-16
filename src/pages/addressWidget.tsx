import React, { useState, useEffect } from "react";
import addData from "../json/address";
import "../style/address.css";

interface AddressWidgetProps {
  inputValue: string; // Define the prop here
}
interface HashDetailsProps {
  hash: string;
}

function truncateAddress(address: string): string {
  if (address.length <=3) {
    return address;
  }

  const start = address.slice(0, 3);
  const end = address.slice(address.length - 3, address.length);

  return `${start}...${end}`;
}

function truncateAdd(address: string): string {
  if (address.length <=10) {
    return address;
  }

  const start = address.slice(0, 10);
  const end = address.slice(address.length - 10, address.length);

  return `${start}...${end}`;
}

const AddressWidget: React.FC<AddressWidgetProps> = ({ inputValue }) => {
  const [selectedDataSource, setSelectedDataSource] = useState("From");
  const [basicData, setBasicData] = useState<any>();
  const [resourceData, setResourceData] = useState<any>();
  const [transactionsData, setTransactionsData] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  const handleDataSourceChange = (newDataSource: string) => {
    setSelectedDataSource(newDataSource);
  };

  // const dataSource = selectedDataSource === "From" ? addDataFrom : addDataTo;

  // call the apis to get the account data
  const getCurrentAccountData = async () => {
    try {
      // call the api to get the basic account data
      const response = await fetch(
        "https://api.trongrid.io/wallet/getaccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: inputValue,
            visible: true,
          }),
        }
      );
      const resData = await response.json();
      console.log(resData);
      setBasicData(resData);

      // call the api to get all the transactions of the account
      const txResponse = await fetch(
        `https://api.trongrid.io/v1/accounts/${inputValue}/transactions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const txResponseData = await txResponse.json();
      console.log(txResponseData.data);
      setTransactionsData(txResponseData.data);

      // call the api to get resources
      const resourcesResponse = await fetch(
        "https://api.trongrid.io/wallet/getaccountresource",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: inputValue,
            visible: true,
          }),
        }
      );
      const resourcesData = await resourcesResponse.json();
      console.log(resourcesData);
      setResourceData(resourcesData);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCurrentAccountData();
  }, []);

  if (basicData && resourceData && transactionsData) {
    return (
      <div className="hash-value-widget">
        <div className="title">Address Details</div>
        <div className="hash-details-main">
          <div className="info-item">
            <div className="info-lable ">Address:</div>
            <div className="info-response-data add-color">
              {" "}
              {truncateAdd(inputValue)}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Balance:</div>
            <div className="info-response-data result-color">
              {basicData.balance ? basicData.balance / 10 ** 6 : 0} TRX
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Create_Time:</div>
            <div className="info-response-data">
              {basicData.create_time ? basicData.create_time : "Not Active"}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Bandwidth:</div>
            <div className="info-response-data">
              Available:{" "}
              {resourceData.NetLimit && resourceData.freeNetUsed
                ? resourceData.freeNetLimit +
                  resourceData.NetLimit -
                  resourceData.freeNetUsed
                : resourceData.NetLimit
                ? resourceData.freeNetLimit + resourceData.NetLimit
                : resourceData.freeNetUsed
                ? resourceData.freeNetLimit - resourceData.freeNetUsed
                : resourceData.freeNetLimit
                ? resourceData.freeNetLimit
                : 0}
              /
              {resourceData.NetLimit
                ? resourceData.freeNetLimit + resourceData.NetLimit
                : resourceData.freeNetLimit
                ? resourceData.freeNetLimit
                : 0}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Energy:</div>
            <div className="info-response-data">
              Available:{" "}
              {resourceData.EnergyLimit ? resourceData.EnergyLimit : 0}/
              {resourceData.EnergyLimit ? resourceData.EnergyLimit : 0}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Votes:</div>
            <div className="info-response-data">
              Voted:{" "}
              {resourceData.tronPowerUsed ? resourceData.tronPowerUsed : "0"}/
              {resourceData.tronPowerLimit ? resourceData.tronPowerLimit : "0"}
            </div>
          </div>
          <div className="info-item2">
            <div className="info-lable">Transactions</div>
            <table className="" id="transaction-table">
              <thead>
                <tr>
                  <th aria-controls="dtHorizontalVerticalExample">Hash</th>
                  <th aria-controls="dtHorizontalVerticalExample">Timestamp</th>
                  <th aria-controls="dtHorizontalVerticalExample">Status</th>
                  <th aria-controls="dtHorizontalVerticalExample">Block</th>
                </tr>
                </thead>
                <tbody>
              {transactionsData.length > 0
                ? transactionsData.map((data: any, index: any) => (
                    <tr key={index} >
                      <td>{truncateAddress(data.txID)}</td>
                      <td>{data.block_timestamp}</td>
                      <td>{data.blockNumber}</td>
                      <td>{data.ret[0].contractRet}</td>
                    </tr> 
                  ))
                : "No transactions yet!"}{" "}
              </tbody>
              
            </table>
          </div>
          {/* <div className="info-item2">
          <div className="info-lable">Delegated</div>
          <div style={{ marginTop: "20px" }}>
            <div className="info-sub-flex">
              <div
                className={`subflex-title ${
                  selectedDataSource === "From" ? "active" : ""
                }`}
                onClick={() => handleDataSourceChange("From")}
              >
                From
              </div>
              <div
                className={`subflex-title ${
                  selectedDataSource === "To" ? "active" : ""
                }`}
                onClick={() => handleDataSourceChange("To")}
              >
                To
              </div>
            </div>
            <table className="subflex-data-main">
              <tbody>
                <tr>
                  <th className="subflex-data">Address</th>
                  <th className="subflex-data">Energy</th>
                  <th className="subflex-data">Bandwidth</th>
                </tr>
                {dataSource.map((data, index) => (
                  <tr key={index}>
                    <td>{truncateAddress(data.address)}</td>
                    <td>{truncateAddress(data.energy)}</td>
                    <td>{truncateAddress(data.bandwidth)}</td>
                  </tr>
                ))}{" "}
              </tbody>
            </table>
          </div>
        </div> */}
          <div className="info-item2">
            <div className="info-lable">Votes</div>
            <table className="vote_table" id="voter-table">
              <thead>
                <tr>
                  <th aria-controls="dtHorizontalVerticalExample">Voter_address</th>
                  <th aria-controls="dtHorizontalVerticalExample">Voter_count</th>
                </tr>
                </thead>
                <tbody>
                {basicData.votes
                  ? basicData.votes.map((data: any, index: any) => (
                      <tr key={index}>
                        <td>{truncateAddress(data.vote_address)}</td>
                        <td>{data.vote_count}</td>
                      </tr>
                    ))
                  : "Have not done voting."}{" "}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return  <div className="loader-container">
    <img className="loader-spinner" src="loading.png"></img>
  </div>;
  }
};

export default AddressWidget;
