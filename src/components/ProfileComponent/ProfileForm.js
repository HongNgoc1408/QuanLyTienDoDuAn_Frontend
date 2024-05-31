import { Button, Form, Input } from "antd";
import React from "react";

const ProfileForm = ({ profile, handleChange, handleSubmit }) => {
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
        <Input name="type" value={profile.type} onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Ngày phát hành"
        name="published_date"
        rules={[{ required: true, message: "Nhập ngày phát hành" }]}
      >
        <Input
          name="published_date"
          value={profile.published_date}
          onChange={handleChange}
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
        <Input
          name="quantity"
          value={profile.quantity}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Ghi chú"
        name="note"
        rules={[{ required: true, message: "Nhập ghi chú" }]}
      >
        <Input name="note" value={profile.note} onChange={handleChange} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
