import { Button, Card, Modal, Select, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  editProgress,
  getProgressByUser,
} from "../../services/ProgressService"; // Đảm bảo bạn import hàm này từ file api của bạn

const { Option } = Select;

const EmployeePage = () => {
  const [progressList, setProgressList] = useState([]);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Hàm gọi API để lấy danh sách dự án
  const fetchProgresses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProgressByUser(user.id_user); // Thay "userId" bằng userId của người dùng hiện tại
      setProgressList(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi lấy danh sách dự án:", error);
      setLoading(false);
    }
  }, [user.id_user]);

  useEffect(() => {
    fetchProgresses();
  }, [fetchProgresses]);

  // Hàm xử lý khi người dùng chọn dự án để chỉnh sửa
  const handleEditProgress = (progress) => {
    setSelectedProgress(progress);
    setIsModalOpen(true);
  };

  // Hàm xử lý khi người dùng hoàn thành việc chỉnh sửa dự án
  const handleFinishEditing = async () => {
    try {
      setLoading(true);
      await editProgress(selectedProgress._id, selectedProgress);
      setSelectedProgress(null);
      setIsModalOpen(false);
      fetchProgresses(); // Sau khi chỉnh sửa, cập nhật lại danh sách dự án
      setLoading(false);
    } catch (error) {
      console.error("Lỗi cập nhật dự án:", error);
      setLoading(false);
    }
  };

  // Hàm xử lý khi người dùng thay đổi trạng thái
  const handleSelectChange = (value) => {
    const updatedProgress = {
      ...selectedProgress,
      status: value,
    };
    setSelectedProgress(updatedProgress);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <h1>Danh sách dự án</h1>
        {/* Hiển thị danh sách dự án */}
        {progressList.map((progress) => (
          <Card
            key={progress._id}
            title={
              <strong style={{ fontSize: "25px" }}>{progress.title}</strong>
            }
            style={{ marginBottom: "20px" }}
          >
            <div>
              <p>
                <strong style={{ fontWeight: "bold", fontSize: "16px" }}>
                  Mô tả:
                </strong>{" "}
                {progress.description}
              </p>
              <p>
                <strong>Thành viên tham gia:</strong>{" "}
                {progress.assignedTo.join(", ")}
              </p>
              <p>
                <strong>Trạng thái:</strong> {progress.status}
              </p>
              <p>
                <strong>Độ ưu tiên:</strong> {progress.priority}
              </p>
              <p>{progress.manager}</p>
            </div>

            {user.id === progress.manager && (
              <Button
                type="primary"
                onClick={() => handleEditProgress(progress)}
              >
                Chỉnh sửa
              </Button>
            )}
          </Card>
        ))}

        {/* Hiển thị modal chỉnh sửa trạng thái nếu có */}
        <Modal
          title="Chỉnh sửa trạng thái dự án"
          open={isModalOpen}
          onOk={handleFinishEditing}
          onCancel={() => setIsModalOpen(false)}
          confirmLoading={loading}
        >
          <Select
            value={selectedProgress?.status}
            onChange={handleSelectChange}
            style={{ width: "100%" }}
          >
            <Option value="Chưa bắt đầu">Chưa bắt đầu</Option>
            <Option value="Đang tiến hành">Đang tiến hành</Option>
            <Option value="Hoàn thành">Hoàn thành</Option>
            <Option value="Bị hủy">Bị hủy</Option>
          </Select>
        </Modal>
      </Space>
    </div>
  );
};

export default EmployeePage;
