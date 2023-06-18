import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
      const response = await axios.get(
        "http://localhost:8100/v1/booking/duty-slips",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            Accept: "application/json",
          },
        }
      );
      setDutySlips(response.data);
    } catch (error) {
      setLoading(false);
      if (error.response.status == 401) {
        setError(true);
        const msg = `${error.response.data.detail}. Going back to authentication page in 5 seconds.`;
        setErrorMessage(msg);
        localStorage.removeItem("jwt");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        setError(true);
        if (error.message == "Network Error") {
          setErrorMessage("Server Error!");
        } else {
          setErrorMessage(error.response.data.detail);
        }
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    }
  };
  const handleRefresh = () => {
    fetchDutySlips();
  };

  const handlePrint = () => {
    const component = document.getElementById("print-component");
    if (!component) {
      console.error("Component element not found.");
      return;
    }
    const doc = new jsPDF();
    html2canvas(component).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
      doc.autoPrint();
      const today = new Date();
      const dateStr = today.toLocaleDateString().replaceAll("/", "-");
      const fileName = `${dateStr}-duty-slip.pdf`;
      doc.save(fileName);
    });
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
          <h5 className="text-[30px] leading-[30px] font-montserrat font-extrabold tracking-none text-white-900 dark:text-white">
            <p className="text-2xl font-bold mb-4 text-white">DUTY SLIPS</p>
          </h5>
          <div className="flex flex-wrap justify-center text-black bg-white">
            {dutySlips.map((dutySlip, index) => (
              <div className="flex flex-wrap border border-gray-500 p-4 mb-4">
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Driver Name:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.name_of_driver}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Vehicle Number:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.vehicle_number}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Date:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {new Date(dutySlip.date).toLocaleDateString("en-GB")}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Time:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.time}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Booking For:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.booking_name}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Place of Visit:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.place_of_visit}
                  </div>
                </div>

                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Number of People:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.num_people}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Phone Number:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.phone}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Department:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.dep}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Designation:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.des}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Purpose:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.purpose}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Chargeable Head:</strong>{" "}
                  <div className="border border-gray-500 p-2">
                    {dutySlip.chargeable_head
                      ? dutySlip.chargeable_head
                      : "N/A"}
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Transaction ID:</strong>{" "}
                  <div className="border border-gray-500 p-2 text-white">
                    Txn ID
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Total Amount:</strong>{" "}
                  <div className="border border-gray-500 p-2 text-white">
                    Amount
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Initial Meter Reading:</strong>{" "}
                  <div className="border border-gray-500 p-2 text-white">
                    Meter
                  </div>
                </div>
                <div className="w-1/4 p-2 border-b border-r border-gray-500">
                  <strong>Final Meter Reading:</strong>{" "}
                  <div className="border border-gray-500 p-2 text-white">
                    Final
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-2 mt-10 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-green-600"
        >
          Print Duty Slips
        </button>
      </div>
    </>
  );
};

export default PrintReadyComponent;
