import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/UserComponent/UserTable"; // Adjust the import path as needed

const UserPage = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigateToAddUserPage = () => {
    navigate("/user/add"); // Adjust the path as needed
  };

  return (
    <Content
      style={{
        minHeight: 600,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Row>
        <Col span={20}>
          <p style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
            Quản lý người dùng
          </p>
        </Col>

        <Col span={4} style={{ padding: 10 }}>
          <Button
            icon={<PlusOutlined />}
            style={{
              fontWeight: "bold",
              fontSize: 15,
              height: 50,
            }}
            onClick={navigateToAddUserPage}
          >
            Thêm người dùng
          </Button>
        </Col>
      </Row>
      <UserTable /> {/* Use the UserTable component here */}
    </Content>
  );
};

export default UserPage;
