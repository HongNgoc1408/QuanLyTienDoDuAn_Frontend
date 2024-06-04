import { Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent/BreadcrumbComponent";
import UserForm from "../../../components/UserComponent/UserForm";
import { editUser, getUserById } from "../../../services/UserService";

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser({
          ...response,
        });
      } catch (error) {
        message.error("Không thể tải dữ liệu người dùng");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);

    editUser(id, user)
      .then(() => {
        message.success("Người dùng đã được chỉnh sửa thành công");
        navigate("/user");
      })
      .catch((error) => {
        message.error("Có lỗi xảy ra khi chỉnh sửa người dùng");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
        <BreadcrumbComponent />
      </div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#1677FF",
          }}
        >
          Hiệu chỉnh người dùng
        </h2>
        <UserForm
          textButton="Hiệu chỉnh"
          user={user}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditUserPage;
