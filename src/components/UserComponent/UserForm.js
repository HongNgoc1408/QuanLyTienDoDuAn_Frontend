// src/components/UserForm.js

import { Button, Form, Input } from "antd";
import React from "react";

const UserForm = ({ user, handleChange, handleSubmit }) => {
  return (
    <Form
      name="user_form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={user}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input name="username" value={user.username} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          name="password"
          value={user.password}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="User ID"
        name="id_user"
        rules={[{ required: true, message: "Please input your user ID!" }]}
      >
        <Input name="id_user" value={user.id_user} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input name="email" value={user.email} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input name="fullName" value={user.fullName} onChange={handleChange} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
