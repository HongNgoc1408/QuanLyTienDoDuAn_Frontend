import React, { useState } from "react";
import ProgressForm from "../../../components/ProgressComponent/ProgressForm";
import { editProgress } from "../../../services/ProgressService";
import { message } from "antd";

const EditProgressPage = () => {
  const [progress, setProgress] = useState({
    title: "",
    description: "",
    assigned_to: [],
    status: "",
    priority: "",
    start_date: "",
    end_date: "",
  });

  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
  ];

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
    editProgress(progress)
      .then(() => {
        console.log("Edit progress");
      })
      .catch((error) => {
        message.error("Có lỗi xảy ra khi thêm tiến độ dự án");
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Hiệu chỉnh tiến dộ dự án</h2>
        <ProgressForm
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

export default EditProgressPage;
