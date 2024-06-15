import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { loginUser } from "../../services/UserService";
import "../../assets/logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      console.log(response)
      if (response.isAdmin) {
        navigate("/home");
      } else if (!response.isAdmin) {
        navigate("/employee");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      alert("Login failed!");
      console.error("Login error:", error);
    }
  };

  return (
    <div
      style={{
        margin: "0 auto",
        paddingLeft: 500,
        paddingRight: 500,
        paddingTop: 68,
        paddingBottom: 50,
        background: "linear-gradient(to right, #4169e1, #40e0d0)",
      }}
    >
      <Form
        name="login_form"
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          padding: 80,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
          border: "2px solid #00bfff", // Thêm thuộc tính border để chỉnh màu viền
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img
            src={require("../../assets/logo.png")}
            alt="Logo"
            style={{ width: 200, height: "auto" }}
          />
        </div>

        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <div style={{textAlign: "center"}}>
            <Button
            type="primary"
            htmlType="submit"
            style={{ width: "40%", height: 40,}}
          >
            Đăng nhập
          </Button>
          </div>
          
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
