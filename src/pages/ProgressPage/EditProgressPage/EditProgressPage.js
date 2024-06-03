import React, { useEffect, useState } from "react";
import ProgressForm from "../../../components/ProgressComponent/ProgressForm";
import {
  editProgress,
  getProgressById,
} from "../../../services/ProgressService";
import { Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent/BreadcrumbComponent";

const EditProgressPage = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgressById(id);
        setProgress({
          ...response,
        });
      } catch (error) {
        message.error("Không thể tải dữ liệu tiến độ dự án");
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [id]);

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
    setLoading(true);

    editProgress(id, progress)
      .then(() => {
        message.success("Tiến độ dự án đã được chỉnh sửa thành công");
        navigate("/progress");
      })
      .catch((error) => {
        message.error("Có lỗi xảy ra khi chỉnh sửa tiến độ dự án");
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
          Hiệu chỉnh tiến độ dự án
        </h2>
        <ProgressForm
          textButton="Hiệu chỉnh"
          options={options}
          progress={progress}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditProgressPage;
