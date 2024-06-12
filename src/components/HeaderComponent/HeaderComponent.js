import { Header } from "antd/es/layout/layout";
import React from "react";
import MenuComponent from "../MenuComponent/MenuComponent";
import { Avatar } from "antd";

const HeaderComponent = () => {
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
        {/* <ButtonComponent textButton="Tài khoản" /> */}
        <Avatar
          size="large"
          style={{
            backgroundColor: "#fde3cf",
            color: "#f56a00",
          }}
        >
          U
        </Avatar>
      </Header>
    </div>
  );
};

export default HeaderComponent;
