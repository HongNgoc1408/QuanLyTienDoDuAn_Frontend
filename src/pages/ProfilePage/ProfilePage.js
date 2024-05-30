import React from "react";
import "./ProfilePage.css"; // Import file CSS
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const ProfilePagePage = () => {
  const navigate = useNavigate();

  const navigateToAddProfile = () => {
    navigate("/add-profile");
  };

  return (
    <div className="container">
      <h2 className="home-page">Quản lý hồ sơ</h2>
      <Button onClick={navigateToAddProfile}>Thêm hồ sơ</Button>
    </div>
  );
};

export default ProfilePagePage;
