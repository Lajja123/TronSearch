import React, { useEffect, useState } from "react";
import addData from "../json/address";
import "../style/address.css";
import { getTypeParameterOwner } from "typescript";

interface HashDetailsProps {
  hash: string;
}

interface APIData {
  address: string;
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
  // store API response data

  const [basicData, setBasicData] = useState<any>();
  const [resourceData, setResourceData] = useState<any>();

  // From|To data
  const [selectedDataSource, setSelectedDataSource] = useState("From");
  const handleDataSourceChange = (newDataSource: string) => {
    setSelectedDataSource(newDataSource);
  };

  const addDataFrom = [
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    // Add more "From" data objects as needed
  ];

  const addDataTo = [
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    {
      address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      energy: "Available: 8,393,982 / 8,393,982",
      bandwidth: "Available: 11,338,014 / 11,529,981",
    },
    // Add more "To" data objects as needed
  ];
  const voterData = [
    {
      voter_add: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      voter_count: "Voted: 0/0",
    },
    {
      voter_add: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      voter_count: "Voted: 0/0",
    },
    {
      voter_add: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      voter_count: "Voted: 0/0",
    },

    // Add more voter data objects as needed
  ];
  const transactionData = [
    {
      transaction_address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      transaction_block: "	53991953",
      transaction_status: "CONFIRMED",
      transaction_timestamp: "2023-08-21 11:47:36",
    },
    {
      transaction_address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      transaction_block: "	53991953",
      transaction_status: "CONFIRMED",
      transaction_timestamp: "2023-08-21 11:47:36",
    },
    {
      transaction_address: "TKpn4QSQ6Q1fKkF67Ljz2qmnskrLXGi9tP",
      transaction_block: "	53991953",
      transaction_status: "CONFIRMED",
      transaction_timestamp: "2023-08-21 11:47:36",
    },
    // Add more voter data objects as needed
  ];
  const dataSource = selectedDataSource === "From" ? addDataFrom : addDataTo;

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
            address: "TK2HxDagVEKk9vykJZbpqB7P1EVANJvkhY",
            visible: true,
          }),
        }
      );
      const resData = await response.json();
      console.log(resData);
      setBasicData(resData);

      // call the api to get resources

      const resourcesResoponse = await fetch(
        "https://api.trongrid.io/wallet/getaccountresource",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: "TK2HxDagVEKk9vykJZbpqB7P1EVANJvkhY",
            visible: true,
          }),
        }
      );
      const resourcesData = await resourcesResoponse.json();
      console.log(resourcesData);
      setResourceData(resourcesData);
      // console.log(resourcesData.EnergyLimit);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCurrentAccountData();
  }, []);

  if (basicData && resourceData) {
    return (
      <div className="hash-value-widget">
        <div className="title">Address Details</div>
        <div className="hash-details-main">
          <div className="info-item">
            <div className="info-lable ">Address:</div>
            <div className="info-response-data add-color">
              {" "}
              {truncateAddress(basicData.address)}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Balance:</div>
            <div className="info-response-data result-color">
              {basicData.balance} SUN
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Allowance:</div>
            <div className="info-response-data">{basicData.allowance}</div>
          </div>
          <div className="info-item">
            <div className="info-lable">Create_Time:</div>
            <div className="info-response-data">{basicData.create_time}</div>
          </div>
          <div className="info-item">
            <div className="info-lable">Energy:</div>
            <div className="info-response-data">{resourceData.EnergyLimit}</div>
          </div>
          <div className="info-item">
            <div className="info-lable">Bandwidth:</div>
            <div className="info-response-data">
              {resourceData.freeNetLimit}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Tron power:</div>
            <div className="info-response-data">
              {resourceData.tronPowerLimit}
            </div>
          </div>
          <div className="info-item">
            <div className="info-lable">Tron power used:</div>
            <div className="info-response-data">
              {resourceData.tronPowerUsed}
            </div>
          </div>
          <div className="info-item2">
            <div className="info-lable">Transactions</div>
            <div className="" id="transaction-table">
              {transactionData.map((data, index) => (
                <div key={index} className="transaction-flex-main">
                  <div className="transaction-flex">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>Hash:</div>
                      <div
                        style={{
                          padding: "5px",
                          fontSize: "13px",
                          color: "#ffb46a",
                        }}
                      >
                        {truncateAddress(data.transaction_address)}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      {/* <div>Timestamp</div> */}
                      <div
                        style={{
                          padding: "5px",
                          fontSize: "13px",
                          color: "lightgray",
                        }}
                      >
                        {data.transaction_timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="transaction-flex">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>Block:</div>
                      <div
                        style={{
                          padding: "5px",
                          fontSize: "13px",
                          color: "lightgray",
                        }}
                      >
                        {data.transaction_block}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>Status:</div>
                      <div
                        style={{
                          padding: "5px",
                          fontSize: "13px",
                          color: "#73bb73",
                        }}
                      >
                        {data.transaction_status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
          <div className="info-item2">
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
          </div>
          <div className="info-item2">
            <div className="info-lable">Votes</div>
            <table className="subflex-data-main" id="voter-table">
              <tbody>
                <tr>
                  <th>Voter_address</th>
                  <th>Voter_count</th>
                </tr>
                {voterData.map((data, index) => (
                  <tr key={index}>
                    <td>{truncateAddress(data.voter_add)}</td>
                    <td>{truncateAddress(data.voter_count)}</td>
                  </tr>
                ))}{" "}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default CurrentAddressDetails;
