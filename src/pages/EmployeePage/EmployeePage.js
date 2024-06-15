import { Button, Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import ProgressForm from "../../components/ProgressComponent/ProgressForm";
import { getProgressByUser } from "../../services/ProgressService"; // Đảm bảo bạn import hàm này từ file api của bạn

const EmployeePage = () => {
  const [progressList, setProgressList] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm gọi API để lấy danh sách dự án khi component được render
  useEffect(() => {
    fetchProgresses();
  }, []);

  const fetchProgresses = async () => {
    try {
      setLoading(true);
      const data = await getProgressByUser("userId"); // Thay "userId" bằng userId của người dùng hiện tại
      setProgressList(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi lấy danh sách dự án:", error);
      setLoading(false);
    }
  };

  // Hàm xử lý khi người dùng chọn dự án để chỉnh sửa
  const handleEditProgress = (progress) => {
    setSelectedProgress(progress);
  };

  // Hàm xử lý khi người dùng hoàn thành việc chỉnh sửa dự án
  const handleFinishEditing = () => {
    setSelectedProgress(null);
    fetchProgresses(); // Sau khi chỉnh sửa, cập nhật lại danh sách dự án
  };

  // Hàm xử lý khi người dùng huỷ bỏ chỉnh sửa
  const handleCancelEditing = () => {
    setSelectedProgress(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button
          type="primary"
          onClick={() => setSelectedProgress({})}
          style={{ marginBottom: "20px" }}
        >
          Tạo mới dự án
        </Button>

        {/* Hiển thị danh sách dự án */}
        {progressList.map((progress) => (
          <Card
            key={progress._id}
            title={progress.title}
            style={{ marginBottom: "20px" }}
          >
            <p>Mô tả: {progress.description}</p>
            <p>Trạng thái: {progress.status}</p>
            <p>Độ ưu tiên: {progress.priority}</p>
            <Button type="primary" onClick={() => handleEditProgress(progress)}>
              Chỉnh sửa
            </Button>
          </Card>
        ))}

        {/* Hiển thị form chỉnh sửa dự án nếu có */}
        {selectedProgress && (
          <ProgressForm
            textButton="Lưu chỉnh sửa"
            progress={selectedProgress}
            loading={loading}
            handleSubmit={handleFinishEditing}
            handleSelectChange={(fieldName, value) => {
              const updatedProgress = {
                ...selectedProgress,
                [fieldName]: value,
              };
              setSelectedProgress(updatedProgress);
            }}
          />
        )}
      </Space>
    </div>
  );
};

export default EmployeePage;
