import React, { useState } from "react";
import ProgressForm from "../../components/ProgressComponent/ProgressForm";
import { addProgress } from "../../services/ProgressService";
import { Alert, Space } from "antd";

const ProgressPage = () => {
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
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
  const handleClose = () => {
    setAlert((prevAlert) => ({
      ...prevAlert,
      visible: false,
    }));
  };

  const handleSubmit = () => {
    addProgress(progress)
      .then(() => {
        setAlert({
          type: "success",
          message: "Thêm tiến độ dự án thành công",
          visible: true,
        });
        console.log("Thêm tiến độ dự án thành công");
      })
      .catch((error) => {
        setAlert({
          type: "error",
          message: "Có lỗi xảy ra khi thêm tiến độ dự án",
          visible: true,
        });
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Thêm tiến dộ dự án</h2>
        {alert.visible && (
          <Space
            direction="vertical"
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Alert
              message={alert.message}
              type={alert.type}
              closable
              onClose={handleClose}
            />
          </Space>
        )}
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

export default ProgressPage;
