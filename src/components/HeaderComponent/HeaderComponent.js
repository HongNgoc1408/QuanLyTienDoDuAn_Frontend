import { Avatar, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuComponent from "../MenuComponent/MenuComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="demo-logo"
          style={{
            color: "white",
            padding: 10,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          <a href="/">Logo</a>
        </div>
        <MenuComponent />
        {isLoggedIn && (
          <Button
            type="text"
            style={{
              color: "black",
              marginRight: 20,
              backgroundColor: "white",
            }}
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        )}
        <Avatar
          size="large"
          style={{
            backgroundColor: "#fde3cf",
            color: "#f56a00",
            marginRight: 20,
          }}
          onClick={() => navigate("/information")}
        >
          U
        </Avatar>
      </Header>
    </div>
  );
};

export default HeaderComponent;
