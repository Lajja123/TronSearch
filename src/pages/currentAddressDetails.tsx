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
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default CurrentAddressDetails;
