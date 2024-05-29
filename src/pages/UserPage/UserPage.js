import React, { useState } from "react";
import UserForm from "../../components/UserComponent/UserForm";
import { registerUser } from "../../services/UserService";

const UserPage = () => {
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
    registerUser(user)
      .then(() => {
        // Xử lý sau khi thêm người dùng thành công
        console.log("User added successfully!");
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Register User</h2>
        <UserForm
          user={user}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default UserPage;
