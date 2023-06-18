import React, { useState, useEffect } from "react";
import axios from "axios";
import RemainingSpaceDiv from "./RemainingSpaceDiv";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Status = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8100/v1/booking/status",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            Accept: "application/json",
          },
        }
      );
      setBookings(response.data);
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
    } finally {
      setLoading(false);
    }
  };
  const handleRefresh = () => {
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
        <div>
          <h5 className="text-[30px] leading-[30px] font-montserrat font-extrabold tracking-none text-white-900 dark:text-white">
            <p className="text-2xl font-bold mb-4 text-white">BOOKING STATUS</p>
          </h5>
          <div className="-mx-4">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-black">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          <span className="px-2 inline-flex">Status</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          <span className="px-2 inline-flex">Date</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          <span className="px-2 inline-flex">Place</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          <span className="px-2 inline-flex">Time</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          <span className="px-2 inline-flex">Driver Name</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          <span className="px-2 inline-flex">Car</span>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          <span className="px-2 inline-flex">
                            Contact Number
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td
                            className={`${
                              booking.status === "Approved"
                                ? "text-green-500"
                                : booking.status === "Pending"
                                ? "text-yellow-400"
                                : "text-red-500"
                            } px-6 py-4 whitespace-nowrap border`}
                          >
                            <span className="px-2 inline-flex">
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {new Date(
                                booking.particulars.date
                              ).toLocaleDateString("en-GB")}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.particulars.place_of_visit}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.particulars.time}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.status === "Approved"
                                ? booking.name_of_driver
                                  ? booking.name_of_driver
                                  : "To Be Decided"
                                : "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.status === "Approved"
                                ? booking.vehicle_number
                                  ? booking.vehicle_number
                                  : "To Be Decided"
                                : "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.status === "Approved"
                                ? booking.phone_of_driver
                                  ? booking.phone_of_driver
                                  : "To Be Decided"
                                : "N/A"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RemainingSpaceDiv />
      </div>
    </>
  );
};

export default Status;
