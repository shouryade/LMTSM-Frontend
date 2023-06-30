import { useState } from "react";
import { Card, Button } from "flowbite-react";
import axios from "axios";
import { HiCheck, HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../endpoint";

function Requisition() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    date: "",
    time: "",
    place_of_visit: "",
    purpose: "personal",
    num_people: "",
    chargeable_head: "",
  });

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const isDateValid = (inputDate) => {
    const currentDate = new Date().toISOString().split("T")[0];
    return inputDate >= currentDate;
  };

  const isTimeValid = (inputTime, selectedDate) => {
    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (selectedDate === currentDate) {
      const selectedTime = new Date(
        `1970-01-01T${inputTime}`
      ).toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return selectedTime >= currentTime;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    setLoading(true);

    axios
      .post(`${BASE_URL}/v1/booking/request`, formValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          setFormValues({
            name: "",
            date: "",
            time: "",
            place_of_visit: "",
            purpose: "personal",
            num_people: "",
            chargeable_head: "",
          });

          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      })
      .catch((error) => {
        handleRequestError(error);
      });
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

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {error && (
          <Alert color="failure" icon={HiInformationCircle} className="mb-4">
            <span>
              <span className="font-medium">{errorMessage} </span>
            </span>
          </Alert>
        )}
        {success && (
          <Alert color="success" icon={HiCheck} className="mb-4">
            <span>
              <span className="font-medium">Success!</span> Vehicle Requisition
              Form Submitted. Check back later for status.
            </span>
          </Alert>
        )}

        <Card id="cardMain">
          <h5 className="text-[30px] leading-[30px] font-inter font-extrabold tracking-none text-white-900 dark:text-white">
            <p>Indent Form for Institute Car/Bus</p>
          </h5>
          <div className="font-inter text-[20px] pb-[3rem] text-[#9CA3AF] dark:text-gray-400">
            <form className="container mx-auto" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid-item">
                  <label className="label">Name of Requisitioner</label>
                  <input
                    className="bg-transparent border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    required={true}
                    autoComplete="off"
                  />
                </div>

                <div className="grid-item">
                  <label className="label">Date of Visit</label>
                  <input
                    className="bg-transparent border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    required={true}
                    autoComplete="off"
                  />
                  {!isDateValid(formValues.date) && (
                    <span className="text-red-500">
                      Please enter a valid date.
                    </span>
                  )}
                </div>

                <div className="grid-item">
                  <label className="label">Time of Visit</label>
                  <input
                    className="bg-transparent border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="time"
                    name="time"
                    value={formValues.time}
                    onChange={handleChange}
                    required={true}
                    autoComplete="off"
                  />
                  {!isTimeValid(formValues.time, formValues.date) && (
                    <span className="text-red-500">
                      Please enter a valid time.
                    </span>
                  )}
                </div>

                <div className="grid-item">
                  <label className="label">Place of Visit</label>
                  <input
                    className="bg-transparent border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="place_of_visit"
                    value={formValues.place_of_visit}
                    onChange={handleChange}
                    required={true}
                    autoComplete="off"
                  />
                </div>

                <div className="grid-item">
                  <label className="label">Number of People</label>
                  <input
                    className="bg-transparent border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    name="num_people"
                    value={formValues.num_people}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid-item">
                  <label className="label">Purpose</label>
                  <select
                    className="bg-transparent border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="purpose"
                    value={formValues.purpose}
                    onChange={handleChange}
                    required={true}
                    autoComplete="off"
                  >
                    <option value="personal">Personal</option>
                    <option value="official">Official</option>
                  </select>
                </div>

                {formValues.purpose === "official" && (
                  <div className="grid-item">
                    <label className="label">Chargeable Head</label>
                    <select
                      className="bg-transparent border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="chargeable_head"
                      value={formValues.chargeable_head}
                      onChange={handleChange}
                    >
                      <option value="Travel Expenses">
                        Travel Expenses (Staff/Faculty)
                      </option>
                      <option value="Horticulture">Horticulture</option>
                      <option value="Admission Expenses">
                        Admission Expenses
                      </option>
                      <option value="Repair and Maintenance">
                        Repair & Maintanance
                      </option>
                      <option value="Placement Cell">Placement Cell</option>
                      <option value="Admin">Admin</option>
                      <option value="Outreach Information TIET Amritsar">
                        OUTREACH INFORMATION CENTRE (TIET) AMRITSAR
                      </option>
                      <option value="Outreach Information TIET Dehradun">
                        OUTREACH INFORMATION CENTRE (TIET) DEHRADUN
                      </option>
                    </select>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="mt-10 inline-flex items-center justify-center px-5 py-3 mr-3 text-inter font-normal text-center text-white rounded-lg bg-[#558EFF] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 text-[#1E1E1E]"
                disabled={
                  !isDateValid(formValues.date) || !isTimeValid(formValues.time)
                }
              >
                <span className="text-center">Send a Booking Request</span>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="#1E1E1E"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 010-2h10.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Requisition;
