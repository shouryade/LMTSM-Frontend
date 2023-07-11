import React, { useEffect, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { BASE_URL } from "../endpoint";

import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const PrintReadyComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [dutySlips, setDutySlips] = useState([]);

  useEffect(() => {
    fetchDutySlips();
  }, []);
  const fetchDutySlips = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/booking/duty-slips`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept: "application/json",
        },
      });
      setDutySlips(response.data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleRequestError = (error) => {
    setLoading(false);

    if (error.code === "ERR_NETWORK") {
      setError(true);
      setErrorMessage("Server Error! Please try later. ");
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else if (error.response.status === 401) {
      setError(true);
      const msg = `${error.response.data.detail}. Going back to the authentication page in 5 seconds.`;
      setErrorMessage(msg);
      localStorage.removeItem("jwt");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } else {
      setError(true);
      if (error.message === "Network Error") {
        setErrorMessage("Server Error!");
      } else {
        setErrorMessage(error.message);
      }
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const handleRefresh = () => {
    fetchDutySlips();
  };

  const handlePrint = async () => {
    var component = document.getElementById("print-component");

    if (!component) {
      console.error("Component element not found.");
      return;
    }

    // // Set the options for the PDF generation
    const options = {
      filename: "duty-slips.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(component).save();
    // // Generate the PDF
    // pdf.set(options).save();
  };

  return (
    <>
      {error && (
        <Alert color="failure" icon={HiInformationCircle} className="mb-4">
          <span>
            <span className="font-medium">{errorMessage} </span>
          </span>
        </Alert>
      )}
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-4">
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>

        <div className="print-component" id="print-component">
          <div className="flex flex-wrap justify-center text-black bg-white">
            <div className="Heading" id="Heading">
              <div>
                <p className="text-2xl pt-8 font-bold mb-4 text-black text-center">
                  DUTY SLIPS
                </p>
              </div>

              {dutySlips.map((dutySlip, index) => (
                <div className="flex flex-wrap border border-gray-500 p-4 mb-4">
                  <div className="border border-gray-500 p-2 mx-1">
                    <strong>Booking For : </strong> {dutySlip.booking_name},
                    <span className="text-blue-500"> {dutySlip.phone}</span>, (
                    {dutySlip.dep} {dutySlip.des})
                  </div>
                  <div className="border border-gray-500 p-2 mx-1">
                    <strong>Additional Details : </strong> {dutySlip.num_people}{" "}
                    people | {dutySlip.purpose} | Chargeable Head:{" "}
                    <span className="text-blue-500">
                      {dutySlip.chargeable_head
                        ? dutySlip.chargeable_head
                        : "N/A"}{" "}
                    </span>
                  </div>
                  <div className="w-full p-2" />
                  <div className="border border-gray-500 p-2 mx-1">
                    <strong>Driver Details:</strong> {dutySlip.name_of_driver},
                    <span className="text-blue-500">
                      {" "}
                      {dutySlip.vehicle_number}
                    </span>
                    {/* {dutySlip.phone_of_driver} */}
                  </div>
                  <div className="border border-gray-500 p-2 mx-1">
                    <strong>Trip Details : </strong>{" "}
                    {new Date(dutySlip.date).toLocaleDateString("en-GB")} ,
                    {dutySlip.time},
                    <span className="text-blue-500">
                      {" "}
                      {dutySlip.place_of_visit}
                    </span>
                  </div>
                  <div className="p-2 mx-1 mr-[60px]">
                    <strong>Total Amount: </strong>{" "}
                    <div className="px-8 text-white" />
                  </div>
                  <div className="p-2 mx-1">
                    <strong>Transaction ID: </strong>{" "}
                    <div className="px-8 text-white" />
                  </div>
                  <div className="w-full p-2" />
                  <div className="border border-gray-500 p-2 mx-1 w-1/4 text-left">
                    <strong>Meter Readings (in KM)</strong> <br />
                    Initial Meter Reading: <br />
                    Final Meter Reading:{" "}
                  </div>
                  <div className="border border-gray-500 p-2 mx-1 w-1/3 text-left">
                    <strong>OUT</strong> <br />
                    Out Date: <br />
                    Out Time:{" "}
                  </div>
                  <div className="border border-gray-500 p-2 mx-1 w-1/3 text-left">
                    <strong>IN</strong> <br />
                    In Date: <br />
                    In Time:{" "}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => handlePrint()}
          className="px-4 py-2 mt-10 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-green-600"
        >
          Print Duty Slips
        </button>
      </div>
    </>
  );
};

export default PrintReadyComponent;
