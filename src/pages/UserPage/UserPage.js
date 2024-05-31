import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/UserComponent/UserTable";
import "./UserPage.css";

const UserPage = () => {
  const navigate = useNavigate();
  const navigateToAdduser = () => {
    navigate("/user/add");
  };

  const [setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/user/all")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="contain-page">
        <h2 style={{ textAlign: "center" }}>Quản lý nhân viên</h2>
      </div>
      <div className="user-list">
        <div className="user-list-header">
          <h3>Danh sách nhân viên</h3>
          <button className="btn-add" onClick={navigateToAdduser}>
            Thêm nhân viên
          </button>
        </div>

        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
