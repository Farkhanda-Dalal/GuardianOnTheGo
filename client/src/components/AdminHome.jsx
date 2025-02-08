import React from "react";
import { Link } from "react-router-dom";
import { FaChild, FaUserFriends, FaMapMarkerAlt } from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-2xl font-semibold text-center py-6">Admin Home</h2>

      <div className="flex-1 bg-gray-100 p-4 mb-4">
        <p className="text-center text-gray-600">PLACEHOLDER FOR SOCKET DATA</p>
      </div>

      <div className="flex justify-center mt-auto">
        <div className="w-full max-w-md">
          <div className="fixed inset-x-0 bottom-0 p-6 flex justify-evenly bg-white shadow-md">
            <Link to="/addChildProfile">
              <button className="flex flex-col items-center bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 w-32">
                <FaChild size={28} className="mb-2" />
                <span className="text-sm">Child Data</span>
              </button>
            </Link>
            <Link to="/addCo-Guardians">
              <button className="flex flex-col items-center bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 w-32">
                <FaUserFriends size={28} className="mb-2" />
                <span className="text-sm">Add Co-Guardians</span>
              </button>
            </Link>
            <Link to="/addSafeZone">
              <button className="flex flex-col items-center bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 w-32">
                <FaMapMarkerAlt size={28} className="mb-2" />
                <span className="text-sm">Add Safe Zone</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
