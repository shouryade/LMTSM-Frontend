import React, { useState, useEffect } from "react";
import axios from "axios";
import RemainingSpaceDiv from "../RemainingSpaceDiv";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../endpoint";

const Approvals = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/v1/booking/bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept: "application/json",
        },
      });
      setBookings(response.data);
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleApproveBooking = async (id) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/v1/booking/approve/${id}`,
        { _id: id, status: "Approved" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            Accept: "application/json",
          },
        }
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status: "Approved" } : booking
        )
      );
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const reason = prompt("Enter the reason for rejection:");
      if (reason) {
        const response = await axios.delete(
          `${BASE_URL}/v1/booking/approve/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              Accept: "application/json",
            },
            data: { reason },
          }
        );
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
        handleRefresh();
      }
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
        <h5 className="text-[30px] leading-[30px] font-montserrat font-extrabold tracking-none text-white-900 dark:text-white">
          <p className="text-2xl font-bold mb-4 text-white">BOOKINGS</p>
        </h5>
        <div className="-mx-4">
          <div className="overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-black">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date Range
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Place of Visit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Purpose and Reason
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Number of People
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="my-2">
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.particulars.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          <div className="px-2">
                            <div>
                              <span className="text-gray-500">From </span>
                              <span className="text-blue-500">
                                {new Date(
                                  booking.particulars.startDate
                                ).toLocaleDateString("en-GB")}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">To </span>
                              <span className="text-blue-500">
                                {new Date(
                                  booking.particulars.endDate
                                ).toLocaleDateString("en-GB")}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.particulars.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.particulars.place_of_visit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.particulars.purpose} -{" "}
                          {booking.particulars.chargeable_head}
                          <br />
                          {booking.particulars.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.particulars.num_people}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border">
                          {booking.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.status === "Pending" && (
                            <button
                              className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded mr-2"
                              onClick={() => handleApproveBooking(booking._id)}
                            >
                              Approve
                            </button>
                          )}
                          <button
                            className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded"
                            onClick={() => handleDeleteBooking(booking._id)}
                          >
                            Delete
                          </button>
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
    </>
  );
};

export default Approvals;
