import { Menu } from "antd";
import React from "react";

const MenuComponent = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user && user.role === "ADMIN";

  // Mảng items gốc
  const defaultItems = [
    {
      key: "2",
      label: (
        <a
          href="/progress"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          Tiến độ dự án
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
        <a href="/docs" style={{ color: "inherit", textDecoration: "none" }}>
          Tài liệu dự án
        </a>
      ),
    },
  ];

  // Thêm mục "Nhân viên" nếu là admin
  const items = role
    ? [
        // ...defaultItems.slice(0, 1), // Sao chép từng phần tử từ defaultItems, chỉ giữ lại phần tử đầu tiên
        {
          key: "1",
          label: (
            <a
              href="/user"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Nhân viên
            </a>
          ),
        },
        ...defaultItems.slice(0), // Sao chép từng phần tử từ defaultItems, bắt đầu từ phần tử thứ hai
      ]
    : [
        ...defaultItems.slice(0, 2), // Sao chép từng phần tử từ defaultItems, giữ lại hai phần tử đầu tiên
        {
          key: "5",
          label: (
            <a
              href="/employee"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Nhiệm vụ
            </a>
          ),
        },
        ...defaultItems.slice(2), // Sao chép từng phần tử từ defaultItems, bắt đầu từ phần tử thứ ba
      ];

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
