import React from 'react';

const Header = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <a href="https://lmtsm.thapar.edu/" className="flex mr-4">
              {/* <img
                src="file:///C:/Users/gpc/Downloads/logo.svg"
                className="mr-8 h-12"
                alt="thapar Logo"
              /> */}
            </a>
          </div>
          <div className="flex justify-start lg:order-4 flex-row-reverse">
            <button
              type="button"
              className="flex mx-10 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            <div
              className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown"
            >
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  abcd
                </span>
                <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">
                  name@thapar.edu
                </span>
              </div>
              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    My profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Account settings
                  </a>
                </li>
              </ul>
              <ul
                className="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Section = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h1 className="mb-4 text-5xl tracking-tight font-bold text-red-900 dark:text-white">
            LOREM IPSUM
          </h1>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* CMS */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-3xl font-semibold">CMS</h2>
            <div className="flex justify-center items-center my-12" style={{ marginTop: '40px' }}>
              <div className="w-64 h-64 bg-gray-200 rounded-full flex justify-center items-center">
                {/* <img src="your-image-url" alt="Transport Icon" className="w-40 h-40" /> */}
              </div>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              {/* TRANSPORT */}
            </ul>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get Started
            </button>
          </div>
          {/* CMS*/}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-3xl font-semibold">TRANSPORT</h2>
            <div className="flex justify-center items-center my-12" style={{ marginTop: '40px' }}>
              <div className="w-64 h-64 bg-gray-200 rounded-full flex justify-center items-center">
                <img
                  src="https://www.istockphoto.com/photos/yellow-school-bus-backgrounds?page=4"
                  alt="Transport Icon"
                  className="w-40 h-40"
                />
              </div>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              {/* List items here */}
            </ul>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get Started
            </button>
          </div>
          {/* TRANSPORT */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-3xl font-semibold">TRANSPORT</h2>
            <div className="flex justify-center items-center my-12" style={{ marginTop: '40px' }}>
              <div className="w-64 h-64 bg-gray-200 rounded-full flex justify-center items-center">
                {/* <img src="your-image-url" alt="Transport Icon" className="w-40 h-40" /> */}
              </div>
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              {/* List items here */}
            </ul>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow sm:flex sm:items-center sm:justify-between p-14 sm:p-2 xl:p-2 dark:bg-gray-800">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0 items-center flex justify-center">
        Made with love by CSE
      </p>
    </footer>
  );
};

const selectService = () => {
  return (
    <>
      <Header />
      <Section />
      <Footer />
    </>
  );
};

export default selectService;
