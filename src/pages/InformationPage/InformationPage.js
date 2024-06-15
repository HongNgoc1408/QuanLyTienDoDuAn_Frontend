import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

const InformationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  if (!user) {
    return <div>No user data available.</div>;
  }

  const handleGoBack = () => {
    navigate("/user");
  };

  return (
    <div className="information-page-container">
      <Form
        name="user_info_form"
        layout="vertical"
        initialValues={user}
        className="user-info-form"
      >
        <Form.Item label="Tài khoản" name="username">
          <Input value={user.username} readOnly />
        </Form.Item>

        <Form.Item label="Mã nhân viên" name="id_user">
          <Input value={user.id_user} readOnly />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input value={user.email} readOnly />
        </Form.Item>

        <Form.Item label="Họ và tên" name="fullName">
          <Input value={user.fullName} readOnly />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={handleGoBack} style={{ marginTop: 20 }}>
        Trở về
      </Button>
    </div>
  );
};

export default InformationPage;
