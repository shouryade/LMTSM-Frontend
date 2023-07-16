import React from 'react';
import {useNavigate} from 'react-router-dom';

const Section = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h1 className="mb-4 text-5xl tracking-tight font-bold text-white dark:text-white">
            Select Service
          </h1>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* CMS */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100  !bg-[#232537] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-3xl font-semibold">Transport</h2>
            <div className="flex justify-center items-center my-12" style={{ marginTop: '10px' }}>
              <div className="w-64 h-64 bg-gray-50 rounded-full flex justify-center items-center">
                <img src="../../Public/bus.png" alt="Transport Icon" className="w-64 h-64 rounded-full object-contain" />
              </div>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              {/* TRANSPORT */}
            </ul>
            <button onClick={() => navigate("/travel")}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Go To Dashboard
            </button>
          </div>
          {/* CMS*/}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100  !bg-[#232537] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-3xl font-semibold">CMS</h2>
            <div className="flex justify-center items-center my-12" style={{ marginTop: '10px' }}>
              <div className="w-64 h-64 bg-gray-50 rounded-full flex justify-center items-center">
                <img
                  src="../../Public/CMS.png"
                  alt="Transport Icon"
                  className="w-64 h-64 rounded-full object-contain"
                />
              </div>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              {/* List items here */}
            </ul>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Go To Dashboard
            </button>
          </div>
          {/* TRANSPORT */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-100  !bg-[#232537] rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-3xl font-semibold">Service</h2>
            <div className="flex justify-center items-center my-12" style={{ marginTop: '10px' }}>
              <div className="w-64 h-64 bg-gray-200 rounded-full flex justify-center items-center">
                <img src="your-image-url" alt="Transport Icon" className="w-40 h-40" />
              </div>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              {/* List items here */}
            </ul>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800"
            >
              Go To Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SelectService = () => {
  return (
    <>
    
      <Section />
   
    </>
  );
};

export default SelectService;
