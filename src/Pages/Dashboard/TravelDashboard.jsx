import { Tabs } from "flowbite-react";
import { MdDashboard } from "react-icons/md";
import {
  HiAdjustments,
  HiUserCircle,
  HiUsers,
  HiBadgeCheck,
  HiOutlineInboxIn,
  HiDocumentDownload,
} from "react-icons/hi";
import Requisition from "../../components/travelComponents/Requisition";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../endpoint";

import Approvals from "../../components/travelComponents/Approvals";
import OfficeUse from "../../components/travelComponents/OfficeUse";
import Status from "../../components/travelComponents/Status";
import RoleManagement from "../../components/travelComponents/RoleManagement";
import PrintReadyComponent from "../../components/travelComponents/PrintReadyComponent";
import DownloadFile from "../../components/travelComponents/Download";

const TravelDashboard = () => {
  const [admin, setAdmin] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/v1/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        const userRole = response.data.role;
        setSuperAdmin(userRole === "super_admin");
        setAdmin(userRole === "admin" || userRole === "super_admin");
      })
      .catch((error) => {
        setError(error);
        setErrorMessage("Failed to get user details");
      });
  }, []);

  return (
    <>
      <div className="py-10 sm:py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <Tabs.Group aria-label="Tabs with icons" style="pills" id="tabs">
          <Tabs.Item
            active={true}
            title="Vehicle Requisition"
            icon={MdDashboard}
          >
            <div className="flex justify-center">
              <Requisition />
            </div>
          </Tabs.Item>
          <Tabs.Item title="Status" icon={HiAdjustments}>
            <Status />
          </Tabs.Item>
          {superAdmin ? (
            <Tabs.Item title="Approvals" icon={HiBadgeCheck}>
              <Approvals />
            </Tabs.Item>
          ) : (
            <Tabs.Item disabled={true} title=""></Tabs.Item>
          )}
          {admin ? (
            <Tabs.Item title="Office Use" icon={HiUserCircle}>
              <OfficeUse />
            </Tabs.Item>
          ) : (
            <Tabs.Item disabled={true} title=""></Tabs.Item>
          )}

          {admin ? (
            <Tabs.Item title="Duty Slip" icon={HiOutlineInboxIn}>
              <PrintReadyComponent />
            </Tabs.Item>
          ) : (
            <Tabs.Item disabled={true} title=""></Tabs.Item>
          )}
          {admin ? (
            <Tabs.Item
              title="Download Completed Trips"
              icon={HiDocumentDownload}
            >
              <DownloadFile />
            </Tabs.Item>
          ) : (
            <Tabs.Item disabled={true} title=""></Tabs.Item>
          )}
          {superAdmin ? (
            <Tabs.Item title="Admin Access" icon={HiUsers}>
              <RoleManagement />
            </Tabs.Item>
          ) : (
            <Tabs.Item disabled={true} title=""></Tabs.Item>
          )}
        </Tabs.Group>
      </div>
    </>
  );
};

export default TravelDashboard;
