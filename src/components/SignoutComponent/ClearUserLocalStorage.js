import React from "react";
import { useHistory } from "react-router-dom";

const ClearUserLocalStorage = () => {
  const history = useHistory();

  const handleClearLocalStorage = () => {
    localStorage.removeItem("user");
    alert("Đã xoá thông tin người dùng khỏi localStorage.");
    history.push("/login"); // Chuyển hướng đến trang đăng nhập sau khi xoá thành công
  };

  return (
    <div>
      <button onClick={handleClearLocalStorage}>Đăng xuất</button>
    </div>
  );
};

export default ClearUserLocalStorage;
