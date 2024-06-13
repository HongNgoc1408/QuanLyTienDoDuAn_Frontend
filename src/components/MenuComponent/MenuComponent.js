import { Menu } from "antd";
import React from "react";

const items = [
  {
    key: "1",
    label: (
      <a href="/home" style={{ color: "inherit", textDecoration: "none" }}>
        Trang chủ
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a href="/user" style={{ color: "inherit", textDecoration: "none" }}>
        Nhân viên
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a href="/profile" style={{ color: "inherit", textDecoration: "none" }}>
        Hồ sơ dự án
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a href="/progress" style={{ color: "inherit", textDecoration: "none" }}>
        Tiến độ dự án
      </a>
    ),
  },
  {
    key: "5",
    label: (
      <a href="/docs" style={{ color: "inherit", textDecoration: "none" }}>
        Tài liệu dự án
      </a>
    ),
  },
];
const MenuComponent = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      // defaultSelectedKeys={["1"]}
      items={items}
      style={{
        flex: 1,
        minWidth: 0,
      }}
    />
  );
};

export default MenuComponent;
