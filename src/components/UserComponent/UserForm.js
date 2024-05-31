import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import React from "react";
import "../../assets/logo.png";
import "./UserForm.css";

const UserForm = ({ user, handleChange, handleSubmit }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/user");
  };
  return (
    <div className="user-form-container">
      <Form
        name="user_form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={user}
        className="user-form"
      >
        <img
          src={require("../../assets/logo.png")}
          alt="Logo"
          className="logo"
        />

        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Mã nhân viên"
          name="id_user"
          rules={[{ required: true, message: "Vui lòng nhập mã nhân viên!" }]}
        >
          <Input name="id_user" value={user.id_user} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ email!" }]}
        >
          <Input name="email" value={user.email} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên đầy đủ!" },
          ]}
        >
          <Input
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </Form.Item>

        <div className="contain-btn">
          <Form.Item className="form-item">
            <Button className="back-button" onClick={handleGoBack}>
              Trở về
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="register-button"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
