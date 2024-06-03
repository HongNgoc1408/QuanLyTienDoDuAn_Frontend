import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import moment from "moment";

const ProgressForm = ({
  options,
  progress,
  handleChange,
  handleSubmit,
  handleSelectChange,
}) => {
  return (
    <Form
      name="progress_form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...progress,
        start_date: progress.start_date ? moment(progress.start_date) : null,
        end_date: progress.end_date ? moment(progress.end_date) : null,
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
        name="assigned_to"
        rules={[
          { required: true, message: "Vui lòng nhập người được giao dự án" },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          name="assigned_to"
          value={progress.assigned_to}
          placeholder="Vui lòng chọn"
          onChange={(value) => handleSelectChange("assigned_to", value)}
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
          onChange={(value) =>
            handleChange({ target: { name: "status", value } })
          }
          options={[
            { value: "not_started", label: "Chưa bắt đầu" },
            { value: "in_progress", label: "Đang tiến hành" },
            { value: "completed", label: "Hoàn thành" },
            { value: "cancel", label: "Bị hủy" },
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
          onChange={(value) =>
            handleChange({ target: { name: "priority", value } })
          }
          options={[
            { value: "low", label: "Thấp" },
            { value: "medium", label: "Trung bình" },
            { value: "high", label: "Cao" },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Ngày bắt đầu"
        name="start_date"
        rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu" }]}
      >
        <DatePicker
          style={{ width: "100%" }}
          name="start_date"
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
          style={{ width: "100%" }}
          name="end_date"
          onChange={(date, dateString) =>
            handleChange({ target: { name: "end_date", value: dateString } })
          }
        />
      </Form.Item>

      <Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "25%",
              height: "50px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Thêm
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default ProgressForm;
