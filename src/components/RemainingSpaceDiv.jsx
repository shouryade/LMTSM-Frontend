import React, { useEffect, useState } from "react";

const RemainingSpaceDiv = () => {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const divStyle = {
    height: screenHeight * 0.5,
  };

  return <div className="flex-grow" style={divStyle}></div>;
};

export default RemainingSpaceDiv;
