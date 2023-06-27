import React from "react";
import { Label, Button, Alert } from "flowbite-react";
import { HiInformationCircle, HiCheck } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [values, setValues] = useState({
    des: "",
    empno: "",
    phone: "",
    dep: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleRequestError = (error) => {
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
        setErrorMessage(error.response.data.message);
      }
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const payload = JSON.stringify(Object.fromEntries(data.entries()));
    const myObj = JSON.parse(payload);
    axios
      .post(
        "/api/v1/auth/register",
        {
          des: myObj.des,
          first_name: myObj.first_name,
          last_name: myObj.last_name,
          email: myObj.email,
          password: myObj.password,
          empno: myObj.empno,
          phone: myObj.phone,
          dep: myObj.dep,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        }
      })
      .catch((error) => {
        handleRequestError(error);
        setValues({
          email: "",
          password: "",
        });
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-row" id="auth">
      <div className="basis-6/12">
        <div className="md:my-[15vh] inline-flex justify-between items-center py-1 px-1 pr-4 mb-7"></div>
        <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-[1rem] text-[3rem] sm:text-[60px] leading-[60px] pt-2 font-inter font-extrabold tracking-normal leading-10 text-[#FFFFFF]">
            Register your
            <br />
            <span className="text-[#c01313]">LMTSM</span> Account
          </h1>
          <p className="pt-2 mt-10 text-[18px] leading-[27px] font-inter font-normal">
            <a
              href="/login"
              className="inline-flex items-center text-inter font-normal text-[#FFFFFF] underline"
            >
              Log In to your account if you already have one
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </p>
        </div>
      </div>
      <div className="basis-6/12">
        <section className="!bg-transparent">
          <div className="flex flex-col items-center justify-center px-1 py-5 mx-auto md:h-screen lg:py-0 ">
            {error && (
              <Alert
                color="failure"
                icon={HiInformationCircle}
                className="mb-4"
              >
                <span>
                  <span className="font-medium">{errorMessage}</span>
                </span>
              </Alert>
            )}
            {success && (
              <Alert color="success" icon={HiCheck} className="mb-4">
                <span>
                  <span className="font-medium">Success!</span> Account has been
                  created. Redirecting to login in 5 seconds.
                </span>
              </Alert>
            )}
            <div className="authbox w-full bg-[#1F2A37] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-inter leading-tight tracking-tight text-[#FFFFFF] md:text-2xl dark:text-white">
                  Sign Up
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="flex space-x-4">
                    <div>
                      <Label
                        htmlFor="des"
                        className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                        value="Designation"
                      />
                      <select
                        id="des"
                        className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="des"
                        value={values.des}
                        onChange={handleChange}
                        required={true}
                      >
                        <option value="faculty">Faculty</option>
                        <option value="staff">Staff</option>
                        <option value="student">Student</option>
                      </select>
                    </div>

                    <div>
                      <Label
                        htmlFor="empno"
                        className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                        value="Roll Number or Employee ID"
                      />
                      <input
                        id="empno"
                        type="number"
                        placeholder="1234567890"
                        className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="empno"
                        value={values.empno}
                        onChange={handleChange}
                        required={true}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div>
                      <Label
                        htmlFor="first_name"
                        className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                        value="First Name"
                      />
                      <input
                        id="first_name"
                        type="text"
                        placeholder="John"
                        className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        required={true}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="last_name"
                        className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                        value="Last Name"
                      />
                      <input
                        id="last_name"
                        type="text"
                        placeholder="Doe"
                        className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        required={true}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div>
                      <Label
                        htmlFor="dep"
                        className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                        value="Department"
                      />
                      <select
                        id="dep"
                        className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="dep"
                        value={values.dep}
                        onChange={handleChange}
                        required={true}
                      >
                        <option value="CSE">CSE</option>
                        <option value="MBA">MBA</option>
                        <option value="LMTSM">LMTSM</option>
                      </select>
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                        value="Email"
                      />
                      <input
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required={true}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                      value="Phone Number"
                    />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="1234567890"
                      className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      required={true}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="password1"
                      className="block mb-2 text-inter text-sm font-medium text-white dark:text-white"
                      value="Create a secure password"
                    />

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-[#4B5563] border border-[#4B5563] text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={values.password}
                      onChange={handleChange}
                      required={true}
                      autoComplete="off"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-inter text-[#1E1E1E] text-medium bg-[#558EFF] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    <span className="text-center text-white">
                      Create My Account !
                    </span>
                  </Button>
                  <p className="text-sm font-light text-white dark:text-gray-400">
                    Already a user?{" "}
                    <a
                      href="/login"
                      className="font-medium text-[#558EFF] hover:underline dark:text-primary-500"
                    >
                      Login to your Account!
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
