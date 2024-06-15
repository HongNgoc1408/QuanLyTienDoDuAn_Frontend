import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProgressForm = ({
  textButton,
  options,
  progress,
  handleChange,
  handleSubmit,
  handleSelectChange,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <Form
      name="progress_form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...progress,
        start_date: progress.start_date
          ? dayjs(progress.start_date, "DD-MM-YYYY")
          : null,
        end_date: progress.end_date
          ? dayjs(progress.end_date, "DD-MM-YYYY")
          : null,
      }}
    >
      <Form.Item
        label="Tên dự án"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
      >
        <Input name="title" value={progress.title} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Mô tả dự án"
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
      >
        <Input.TextArea
          name="description"
          value={progress.description}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Người được giao dự án"
        name="assignedTo"
        rules={[
          { required: true, message: "Vui lòng nhập người được giao dự án" },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          name="assignedTo"
          value={progress.assignedTo}
          placeholder="Vui lòng chọn"
          onChange={(value) => handleSelectChange("assignedTo", value)}
          options={options}
        />
      </Form.Item>

      <Form.Item
        label="Trạng thái"
        name="status"
        rules={[{ required: true, message: "Vui lòng chọn trạng thái dự án" }]}
      >
        <Select
          name="status"
          value={progress.status}
          onChange={(value) =>
            handleChange({ target: { name: "status", value } })
          }
          options={[
            { value: "Chưa bắt đầu", label: "Chưa bắt đầu" },
            { value: "Đang tiến hành", label: "Đang tiến hành" },
            { value: "Hoàn thành", label: "Hoàn thành" },
            { value: "Bị hủy", label: "Bị hủy" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Độ ưu tiên"
        name="priority"
        rules={[{ required: true, message: "Vui lòng nhập độ ưu tiên" }]}
      >
        <Select
          name="priority"
          value={progress.priority}
          onChange={(value) =>
            handleChange({ target: { name: "priority", value } })
          }
          options={[
            { value: "Thấp", label: "Thấp" },
            { value: "Trung bình", label: "Trung bình" },
            { value: "Cao", label: "Cao" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Ngày bắt đầu"
        name="start_date"
        rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu" }]}
      >
        <DatePicker
          format="DD-MM-YYYY"
          style={{ width: "100%" }}
          name="start_date"
          // value={progress.start_date ? dayjs(progress.start_date) : null}
          onChange={(date, dateString) =>
            handleChange({ target: { name: "start_date", value: dateString } })
          }
        />
      </Form.Item>

      <Form.Item
        label="Ngày kết thúc"
        name="end_date"
        rules={[{ required: true, message: "Vui lòng nhập ngày kết thúc" }]}
      >
        <DatePicker
          format="DD-MM-YYYY"
          style={{ width: "100%" }}
          name="end_date"
          // value={progress.end_date ? dayjs(progress.end_date) : null}
          onChange={(date, dateString) =>
            handleChange({ target: { name: "end_date", value: dateString } })
          }
        />
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
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "25%",
              height: "50px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            loading={loading}
          >
            {textButton}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ProgressForm;
