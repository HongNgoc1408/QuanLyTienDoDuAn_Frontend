import { message } from "antd";
import React, { useState } from "react";
import UserForm from "../../../components/UserComponent/UserForm";
import {
  checkEmailExistence,
  checkIdExistence,
  checkUsernameExistence,
  registerUser,
} from "../../../services/UserService";

const AddUser = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    id_user: "",
    email: "",
    fullName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const isUsernameExisting = await checkUsernameExistence(user.username);
      if (isUsernameExisting) {
        message.error("Tài khoản nhân viên đã tồn tại trong hệ thống!");
        return;
      }
      const isIdExisting = await checkIdExistence(user.id_user);
      if (isIdExisting) {
        message.error("Mã nhân viên đã tồn tại trong hệ thống!");
        return;
      }
      const isEmailExisting = await checkEmailExistence(user.email);
      if (isEmailExisting) {
        message.error("Email nhân viên đã tồn tại trong hệ thống!");
        return;
      }

      await registerUser(user);
      message.success("Thêm nhân viên thành công");
      setTimeout(5);
      window.location.reload();
    } catch (error) {
      message.error("Có lỗi xảy ra khi kiểm tra tên người dùng hoặc đăng ký!");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <UserForm
        textButton="Đăng ký"
        user={user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddUser;
