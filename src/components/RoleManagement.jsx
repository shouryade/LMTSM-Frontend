import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../endpoint";

const RoleManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/v1/admin/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept: "application/json",
        },
      });
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      handleRequestError(error);
    }
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApproveRole = async (id, role) => {
    try {
      await axios.put(`${BASE_URL}/v1/admin/approve/${id}?role=${role}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept: "application/json",
        },
      });
      fetchUsers();
    } catch (error) {
      setLoading(false);
      handleRequestError(error);
    }
  };

  const handleRevokeRole = async (id, role) => {
    try {
      await axios.delete(`${BASE_URL}/v1/admin/approve/${id}?role=${role}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          Accept: "application/json",
        },
      });
      fetchUsers();
    } catch (error) {
      setLoading(false);
      handleRequestError(error);
    }
  };
  const handleRefresh = () => {
    fetchUsers();
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {error && (
        <Alert color="failure" icon={HiInformationCircle} className="mb-4">
          <span>
            <span className="font-medium">{errorMessage} </span>
          </span>
        </Alert>
      )}
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-4">
          <button
            className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
        <div>
          <h5 className="text-[30px] leading-[30px] font-montserrat font-extrabold tracking-none text-white-900 dark:text-white">
            <p className="text-2xl font-bold mb-4 text-white">
              ROLE MANAGEMENT
            </p>
          </h5>
          <div className="-mx-4">
            <div className="overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-black">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            {user.first_name + " " + user.last_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            {user.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            {user.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border">
                            {user.role === "admin" ? (
                              <button
                                className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded mr-2"
                                onClick={() =>
                                  handleRevokeRole(user._id, "admin")
                                }
                              >
                                Revoke Admin
                              </button>
                            ) : (
                              <button
                                className="text-white bg-green-500 hover:bg-green-700 py-2 px-4 rounded mr-2"
                                onClick={() =>
                                  handleApproveRole(user._id, "admin")
                                }
                              >
                                Grant Admin
                              </button>
                            )}
                            {user.role === "super_admin" ? (
                              <button
                                className="text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded"
                                onClick={() =>
                                  handleRevokeRole(user._id, "super_admin")
                                }
                              >
                                Revoke Super Admin
                              </button>
                            ) : (
                              <button
                                className="text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
                                onClick={() =>
                                  handleApproveRole(user._id, "super_admin")
                                }
                              >
                                Grant Super Admin
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleManagement;
