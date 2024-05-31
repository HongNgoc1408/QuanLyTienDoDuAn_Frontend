import React, { useState } from "react";
import UserForm from "../../../components/UserComponent/UserForm";
import { registerUser } from "../../../services/UserService";

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
    registerUser(user)
      .then(() => {
        window.alert("User added successfully!");
      })
      .catch((error) => {
        window.alert("Failed to add user!");
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <UserForm
        user={user}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddUser;
