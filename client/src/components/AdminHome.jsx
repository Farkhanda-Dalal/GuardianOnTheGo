import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      <h2>Admin Home</h2>
      <div>
        <Link to="/addChildProfile">
          <button>Add Child Profile</button>
        </Link>
        <Link to="/addCo-Guardians">
          <button>Add Co-Guardians</button>
        </Link>
        <Link to="/addSafeZone">
          <button>Add Safe Zone</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
