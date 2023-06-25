import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function OfficeUse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [total, setTotal] = useState("");
  const [tripId, setTripId] = useState("");
  const [startReading, setStartReading] = useState("");
  const [endReading, setEndReading] = useState("");
  const [inTime, setInTime] = useState("");
  const [inDate, setInDate] = useState("");
  const [outDate, setOutDate] = useState("");
  const [outTime, setOutTime] = useState("");
  const [dropdownId, setDropdownId] = useState("");

  useEffect(() => {
    fetchApprovedBookings();
  }, []);

  const fetchApprovedBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8100/v1/booking/approved",
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
    }
  };

  const handleAllocateResourceSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !vehicle) {
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:8100/v1/booking/approved/${dropdownId}/allocate`,
        {
          name,
          phone,
          vehicle,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            Accept: "application/json",
          },
        }
      );

      fetchApprovedBookings();

      setName("");
      setPhone("");
      setVehicle("");
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTripSubmit = async (e) => {
    e.preventDefault();
    if (
      !total ||
      !tripId ||
      !startReading ||
      !endReading ||
      !inTime ||
      !inDate ||
      !outTime ||
      !outDate
    ) {
      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `http://localhost:8100/v1/booking/approved/${dropdownId}/completed`,
        {
          total,
          trip_id: tripId,
          start: startReading,
          end: endReading,
          inTime: inTime,
          inDate: inDate,
          outTime: outTime,
          outDate: outDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            Accept: "application/json",
          },
        }
      );

      fetchApprovedBookings();

      setTotal(null);
      setTripId(null);
      setStartReading(null);
      setEndReading(null);
      setInTime(null);
      setInDate(null);
      setOutDate(null);
      setOutTime(null);
    } catch (error) {
      handleRequestError(error);
    } finally {
      setLoading(false);
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
    fetchApprovedBookings();
  };

  const handleDropdownToggle = (id) => {
    if (dropdownId === id) {
      setDropdownId(null);
    } else {
      setDropdownId(id);
    }
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
        <div>
          <h5 className="text-[30px] leading-[30px] font-montserrat font-extrabold tracking-none text-white-900 dark:text-white">
            <p className="text-2xl font-bold mb-4 text-white">
              APPROVED TRIP STATUS
            </p>
          </h5>
          <div className="-mx-4">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-black">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Trip Completed
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Purpose
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Date of Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Time of Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Place of Visit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Number of People
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.trip_completed ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.particulars.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.particulars.purpose}
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
                              {booking.particulars.time}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.particulars.place_of_visit}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <span className="px-2 inline-flex">
                              {booking.particulars.num_people}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            <div className="flex items-center">
                              <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                onClick={() =>
                                  handleDropdownToggle(booking._id)
                                }
                              >
                                Actions
                              </button>

                              {dropdownId === booking._id && (
                                <div className="ml-4">
                                  {!booking.name_of_driver && (
                                    <form
                                      onSubmit={handleAllocateResourceSubmit}
                                      className="grid grid-cols-2 gap-4"
                                    >
                                      <input
                                        type="text"
                                        placeholder="Driver Name"
                                        value={name}
                                        required={true}
                                        onChange={(e) => {
                                          setName(e.target.value);
                                        }}
                                        className="px-4 py-2 border rounded-md"
                                      />
                                      <input
                                        type="tel"
                                        placeholder="Driver Phone"
                                        value={phone}
                                        required={true}
                                        autoComplete="off"
                                        onChange={(e) => {
                                          setPhone(e.target.value);
                                        }}
                                        className="px-4 py-2 border rounded-md"
                                      />
                                      <input
                                        type="text"
                                        placeholder="Vehicle Number"
                                        value={vehicle}
                                        required={true}
                                        autoComplete="off"
                                        onChange={(e) => {
                                          setVehicle(e.target.value);
                                        }}
                                        className="px-4 py-2 border rounded-md"
                                      />
                                      <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                      >
                                        Allocate
                                      </button>
                                    </form>
                                  )}
                                  {booking.name_of_driver &&
                                    !booking.trip_completed && (
                                      <form
                                        onSubmit={handleCompleteTripSubmit}
                                        className="grid grid-cols-2 gap-4"
                                      >
                                        <input
                                          type="number"
                                          placeholder="Total Amount"
                                          value={total}
                                          onChange={(e) =>
                                            setTotal(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Transaction ID"
                                          value={tripId}
                                          onChange={(e) =>
                                            setTripId(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />
                                        <input
                                          type="number"
                                          placeholder="Starting Reading"
                                          value={startReading}
                                          onChange={(e) =>
                                            setStartReading(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />
                                        <input
                                          type="number"
                                          placeholder="Closing Reading"
                                          value={endReading}
                                          onChange={(e) =>
                                            setEndReading(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />

                                        <input
                                          type="text"
                                          placeholder="Out Date"
                                          value={outDate}
                                          onChange={(e) =>
                                            setOutDate(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />
                                        <input
                                          type="text"
                                          placeholder="Out Time"
                                          value={outTime}
                                          onChange={(e) =>
                                            setOutTime(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />
                                        <input
                                          type="text"
                                          placeholder="In Date "
                                          value={inDate}
                                          onChange={(e) =>
                                            setInDate(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />
                                        <input
                                          type="text"
                                          placeholder="In Time"
                                          value={inTime}
                                          onChange={(e) =>
                                            setInTime(e.target.value)
                                          }
                                          required={true}
                                          className="px-4 py-2 border rounded-md"
                                        />

                                        <button
                                          type="submit"
                                          className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                                        >
                                          Complete Trip
                                        </button>
                                      </form>
                                    )}
                                </div>
                              )}
                            </div>
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
      </div>
    </>
  );
}

export default OfficeUse;
