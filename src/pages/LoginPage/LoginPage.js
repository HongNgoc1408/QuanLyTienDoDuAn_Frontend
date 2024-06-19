import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/logo.png";
import { loginUser } from "../../services/UserService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      console.log(response);
      if (response.isAdmin) {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/profile");
      } else if (!response.isAdmin) {
        localStorage.setItem("user", JSON.stringify(response));
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
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "5vh", // 5% của chiều cao viewport
        paddingBottom: "5vh", // 5% của chiều cao viewport
        background: "linear-gradient(to right, #4169e1, #40e0d0)",
        minHeight: "100vh", // Tối thiểu chiều cao của màn hình
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="login_form"
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          width: "100%", // 100% chiều rộng của Form
          maxWidth: 400, // Tối đa 400px chiều rộng của Form
          padding: "5%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
          border: "2px solid #00bfff", // Thêm thuộc tính border để chỉnh màu viền
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "5%" }}>
          <img
            src={require("../../assets/logo.png")}
            alt="Logo"
            style={{ width: "60%", maxWidth: 200, height: "auto" }}
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
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", height: 40 }}
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
