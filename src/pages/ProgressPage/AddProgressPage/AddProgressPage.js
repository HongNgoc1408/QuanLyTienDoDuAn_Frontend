import React, { useState } from "react";
import ProgressForm from "../../../components/ProgressComponent/ProgressForm";
import { addProgress } from "../../../services/ProgressService";
import { message } from "antd";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent/BreadcrumbComponent";
import { getUsers } from "../../../services/UserService";

const AddProgressPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
    title: "",
    description: "",
    assigned_to: [],
    status: "",
    priority: "",
    start_date: "",
    end_date: "",
  });

  // const options = [
  //   { label: "Option 1", value: "1" },
  //   { label: "Option 2", value: "2" },
  // ];

  const options = async () => {
    try {
      const users = await getUsers();

      const formattedData = users.map((user, index) => ({
        label: user.id_user,
        value: user.id_user,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  options();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress((prevProgress) => ({
      ...prevProgress,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addProgress(progress)
      .then(() => {
        window.location.reload();
        message.success("Thêm tiến độ dự án thành công");
      })
      .catch((error) => {
        message.error("Có lỗi xảy ra khi thêm tiến độ dự án");
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
        <BreadcrumbComponent />
      </div>
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#1677FF",
          }}
        >
          Thêm tiến độ dự án
        </h2>
        <ProgressForm
          textButton="Thêm"
          options={options}
          progress={progress}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default AddProgressPage;
