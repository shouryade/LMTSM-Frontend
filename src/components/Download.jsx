import { useState } from "react";
import { Card, Button } from "flowbite-react";
import axios from "axios";
import { HiCheck, HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function DownloadFile() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    axios
      .get("/api/v1/booking/download", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        responseType: "blob",
      })
      .then((response) => {
        console.log(response.headers);
        if (response.status === 200) {
          const href = URL.createObjectURL(response.data);

          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", "file.xlsx");
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          URL.revokeObjectURL(href);
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
              <span className="font-medium">Success!</span> The Download should
              begin in a few seconds.
            </span>
          </Alert>
        )}

        <Card id="cardMain">
          <h5 className="text-[30px] leading-[30px] font-inter font-extrabold tracking-none text-white-900 dark:text-white">
            <p>Download Completed Trips Information</p>
          </h5>
          <Button onClick={handleDownload}>Download File</Button>
        </Card>
      </div>
    </>
  );
}

export default DownloadFile;
