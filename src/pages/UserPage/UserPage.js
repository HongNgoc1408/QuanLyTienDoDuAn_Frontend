import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  }, []);

  return (
    <div>
      <div className="contain-page">
        <h2 style={{ textAlign: "center" }}>Quản lý nhân viên</h2>
        <button className="btn-add" onClick={navigateToAdduser}>
          Thêm nhân viên
        </button>
      </div>
      <div className="user-list">
        <h3>Danh sách nhân viên</h3>
      </div>
    </div>
  );
};

export default UserPage;
