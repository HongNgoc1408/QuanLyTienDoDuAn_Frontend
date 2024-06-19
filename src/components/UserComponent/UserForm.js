import { Button, Form, Input, Radio } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/logo.png";
import "./UserForm.css";

const UserForm = ({ user, handleChange, handleSubmit, textButton }) => {
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
          rules={[
            { required: true, message: "Vui lòng nhập tên người dùng!" },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "Tên người dùng không được chứa ký tự đặc biệt!",
            },
          ]}
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
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: "Mật khẩu phải chứa ít nhất một chữ cái và một chữ số!",
            },
          ]}
        >
          <Input.Password
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ email!" },
            { type: "email", message: "Vui lòng nhập địa chỉ email hợp lệ!" },
          ]}
        >
          <Input name="email" value={user.email} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ và tên đầy đủ!" },
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: "Họ và tên chỉ chứa chữ cái và khoảng trắng!",
            },
          ]}
        >
          <Input
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          label="CCCD"
          name="cccd"
          rules={[
            { required: true, message: "Vui lòng nhập CCCD!" },
            {
              pattern: /^[0-9]{12}$/,
              message: "CCCD phải có đúng 12 chữ số!",
            },
          ]}
        >
          <Input name="cccd" value={user.cccd} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^0[0-9]{9}$/,
              message: "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số!",
            },
          ]}
        >
          <Input name="phone" value={user.phone} onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="sex"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Radio.Group name="sex" value={user.sex} onChange={handleChange}>
            <Radio value={true}>Nam</Radio>
            <Radio value={false}>Nữ</Radio>
          </Radio.Group>
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
              {textButton}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
