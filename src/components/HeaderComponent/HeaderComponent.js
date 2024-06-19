import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import { Header } from "antd/es/layout/layout";

import React from "react";
import { useNavigate } from "react-router-dom";
import MenuComponent from "../MenuComponent/MenuComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const content = (
    <div>
      <Button
        type="link"
        onClick={() => navigate("/information")}
        icon={<UserOutlined />}
      >
        Thông tin tài khoản
      </Button>
      <Button type="link" onClick={handleLogout} icon={<LogoutOutlined />}>
        Đăng xuất
      </Button>
    </div>
  );

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
          <a href="">Logo</a>
        </div>
        <MenuComponent />
        <span
          style={{
            color: "white",
            marginRight: 20,
            maxHeight: "50%",
            alignItems: "center",
            display: "flex",
          }}
        >
          {user.fullName}
        </span>
        <Popover content={content} placement="bottomRight">
          {user.fullName ? (
            <Avatar
              size={40}
              style={{ backgroundColor: "#87d068", cursor: "pointer" }}
            >
              {user.fullName.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              size={40}
              style={{ backgroundColor: "#87d068", cursor: "pointer" }}
            >
              {/* Mặc định hiển thị '?' nếu không có username */}U
            </Avatar>
          )}
        </Popover>
      </Header>
    </div>
  );
};

export default HeaderComponent;
