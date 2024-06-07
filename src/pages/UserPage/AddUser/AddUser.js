import { message } from "antd";
import React, { useState } from "react";
import UserForm from "../../../components/UserComponent/UserForm";
import {
  checkUserExistence,
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

  const handleSubmit = () => {
    checkUserExistence(user)
      .then((isExisting) => {
        if (isExisting) {
          message.error("Người dùng đã tồn tại trong hệ thống!");
        } else {
          registerUser(user)
            .then(() => {
              message.success("Thêm nhân viên thành công");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch((error) => {
              message.error("Có lỗi xãy ra khi thêm nhân viên!");
              console.error("Error:", error);
            });
        }
      })
      .catch((error) => {
        message.error("Có lỗi xãy ra khi kiểm tra người dùng!");
        console.error("Error:", error);
      });
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
