import { Button, DatePicker, Form, Input, Select, InputNumber } from "antd";
import React from "react";

const ProfileForm = ({
  options,
  profile,
  handleChange,
  handleSubmit,
  handleSelectChange,
}) => {
  return (
    <Form
      name="profile_form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={profile}
    >
      <Form.Item
        label="Số, ký hiệu văn bản"
        name="title"
        rules={[{ required: true, message: "Nhập số, ký hiệu văn bản" }]}
      >
        <Input name="title" value={profile.title} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Nội dung trích yếu"
        name="content"
        rules={[{ required: true, message: "Nhập nội dung trích yếu" }]}
      >
        <Input.TextArea
          name="content"
          value={profile.content}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Loại văn bản"
        name="type"
        rules={[{ required: true, message: "Nhập loại văn bản" }]}
      >
        {/* <Input name="type" value={profile.type} onChange={handleChange} /> */}
        <Select
          allowClear
          style={{ width: "100%" }}
          name="type"
          value={profile.type}
          placeholder="Vui lòng chọn"
          onChange={(value) => handleSelectChange("type", value)}
          options={options}
        />
      </Form.Item>

      <Form.Item
        label="Ngày phát hành"
        name="published_date"
        rules={[{ required: true, message: "Nhập ngày phát hành" }]}
      >
        <DatePicker
          style={{ width: "100%" }}
          name="published_date"
          onChange={(date, dateString) =>
            handleChange({
              target: { name: "published_date", value: dateString },
            })
          }
        />
      </Form.Item>

      <Form.Item
        label="Cơ quan ban hành"
        name="organ"
        rules={[{ required: true, message: "Nhập cơ quan ban hành" }]}
      >
        <Input name="organ" value={profile.organ} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Số lượng bản"
        name="quantity"
        rules={[{ required: true, message: "Nhập số lượng bản" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          name="quantity"
          value={profile.quantity}
          onChange={(value) =>
            handleChange({
              target: { name: "quantity", value },
            })
          }
        />
      </Form.Item>

      <Form.Item
        label="Ghi chú"
        name="note"
        rules={[{ required: true, message: "Nhập ghi chú" }]}
      >
        <Input.TextArea
          name="content"
          value={profile.content}
          onChange={handleChange}
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

export default ProfileForm;
