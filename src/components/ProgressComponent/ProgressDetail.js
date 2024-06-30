import { Button, Form, Progress } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProgressDetail = ({ progress, loading }) => {
  const navigate = useNavigate();

  return (
    <Form
      name="progress_form"
      layout="vertical"
      initialValues={{
        ...progress,
        start_date: progress.start_date
          ? dayjs(progress.start_date, "dd-MM-yyyy")
          : null,
        end_date: progress.end_date
          ? dayjs(progress.end_date, "dd-MM-yyyy")
          : null,
      }}
    >
      <Form.Item label="Tên dự án" name="title">
        <span>{progress.title}</span>
      </Form.Item>

      <Form.Item label="Mô tả dự án" name="description">
        <span>{progress.description}</span>
      </Form.Item>

      <Form.Item label="Người quản lý dự án" name="manager">
        <span>{progress.manager}</span>
      </Form.Item>

      <Form.Item label="Người được giao dự án" name="assignedTo">
        <span>
           {progress.assignedTo}
        </span>
      </Form.Item>

      <Form.Item label="Hồ sơ" name="profileId">
        <Link to={`/progress/profile/detail/${progress._id}`}>
          {progress.profileId}
        </Link>
      </Form.Item>

      <Form.Item label="Trạng thái" name="status">
        <span>{progress.status}</span>
      </Form.Item>

      <Form.Item label="Độ ưu tiên" name="priority">
        <span>{progress.priority}</span>
      </Form.Item>

      <Form.Item label="Ngày bắt đầu" name="start_date">
        <span>{progress.start_date}</span>
      </Form.Item>

      <Form.Item label="Ngày kết thúc" name="end_date">
        <span>{progress.end_date}</span>
      </Form.Item>
      <Form.Item label="Phần trăm hoàn thành" name="percent">
        <Progress strokeLinecap="butt" percent={progress.percent} />
      </Form.Item>
      <Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => navigate("/progress")}
            style={{
              width: "25%",
              height: "50px",
              fontSize: "15px",
              fontWeight: "bold",
              marginRight: "15px",
            }}
            loading={loading}
          >
            Trở về
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ProgressDetail;
