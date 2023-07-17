import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import busImage from "../../assets/bus.png";
import cmsImage from "../../assets/cms.png";

const SelectService = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-lg lg:py-5 lg:px-6">
        <h1 className="mb-4 text-2xl tracking-tight font-bold text-white dark:text-white text-center">
          Select Service
        </h1>

        <div className="space-y-8 flex flex-wrap sm:gap-6 xl:gap-10 lg:space-y-0">
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100  !bg-[#232537] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-xl font-semibold">Transport</h2>
            <div
              className="flex justify-center items-center my-12"
              style={{ marginTop: "10px" }}
            >
              <div className="w-32 h-32 bg-gray-50 rounded-full flex justify-center items-center">
                <img
                  src={busImage}
                  alt="Transport Icon"
                  className="w-32 h-32 rounded-full object-contain"
                />
              </div>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left"></ul>
            <Button
              onClick={() => navigate("/dashboard/travel")}
              className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Go To Dashboard
            </Button>
          </div>

          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100  !bg-[#232537] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-xl font-semibold">CMS</h2>
            <div
              className="flex justify-center items-center my-12"
              style={{ marginTop: "10px" }}
            >
              <div className="w-32 h-32 bg-gray-50 rounded-full flex justify-center items-center">
                <img
                  src={cmsImage}
                  alt="Transport Icon"
                  className="w-32 h-32 rounded-full object-contain"
                />
              </div>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left"></ul>
            <Button
              disabled
              className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Go To Dashboard
            </Button>
          </div>

          {/* <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100  !bg-[#232537] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-xl font-semibold">Service</h2>
            <div
              className="flex justify-center items-center my-12"
              style={{ marginTop: "10px" }}
            >
              <div className="w-32 h-32 bg-gray-200 rounded-full flex justify-center items-center">
                <img
                  src="your-image-url"
                  alt="Transport Icon"
                  className="w-40 h-40"
                />
              </div>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left"></ul>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Go To Dashboard
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SelectService;
