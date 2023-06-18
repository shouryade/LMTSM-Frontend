export default function HomePage() {
  return (
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-left lg:py-16 lg:px-12">
      <h1 class="mb-12 text-[3rem] sm:text-[6rem] leading-[4rem] sm:leading-[6rem] pt-2 font-montserrat font-black tracking-normal leading-10 text-slate-100">
        LM THAPAR SCHOOL OF MANAGEMENT
      </h1>

      <p class="mt-10 text-[1rem] sm:text-[24px] leading-[36px] font-montserrat font-normal text-[#ffedff]">
        LMTSM IS A BUSINESS EDUCATION PIONEER IN NORTHERN INDIA, WHICH HAS A
        LEGACY OF
        <br />
        TRANSFORMING GRADUATES INTO PROFESSIONALS WITH A UNIQUE PLATFORM OF
        GLOBAL EXPOSURE WITH EXPERIENTIAL LEARNING.
      </p>

      <div class="mt-[8rem] flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-right sm:space-y-0 sm:space-x-4">
        <a
          href="/dashboard"
          class="inline-flex items-center justify-center px-5 py-3 text-inter font-normal text-center text-white rounded-lg bg-[#c01313] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          Get Started
          <svg
            class="w-5 h-5 ml-2 -mr-1"
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

        <button className="inline-flex justify-center items-center py-3 px-5 text-inter font-normal text-center text-white-900 rounded-lg border border-gray-300 hover:bg-primary-600 hover:text-red-500 focus:ring-4 focus:red-500 ">
          <a href="https://lmtsm.thapar.edu/" target="_blank">
            Learn More
          </a>
        </button>
      </div>
    </div>
  );
}
