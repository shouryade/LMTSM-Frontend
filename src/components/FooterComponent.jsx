import React from "react";
import { Footer } from "flowbite-react";
const FooterComponent = () => {
  return (
    <Footer
      container={true}
      className="
      mt-auto
      !bg-[#232537]
    text-montserrat text-[18px] leading-[18px] text-white-500"
    >
      <div className="w-full text-center">
        <Footer.Copyright
          href="/"
          by="Developed by CSE Batch of '25 and '26, Derabassi"
          year={2023}
        />
      </div>
    </Footer>
  );
};

export default FooterComponent;
