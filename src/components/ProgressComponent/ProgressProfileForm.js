import { Button, DatePicker, Form, Input, Select, InputNumber } from "antd";
import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ProgressProfileForm = ({
  id,
  textButton,
  options,
  optionsFile,
  profile,
  handleChange,
  handleSubmit,
  handleSelectChange,
  loading,
}) => {
  const handleDateChange = (date, dateString) => {
    handleChange({
      target: { name: "published_date", value: dateString },
    });
  };
  const navigate = useNavigate();

  return (
    <Form
      name="profile_form"
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        ...profile,
        published_date: profile.published_date
          ? dayjs(profile.published_date, "DD-MM-YYYY")
          : null,
      }}
    >
      <Form.Item
        label="Số, ký hiệu văn bản"
        name="title"
        rules={[{ required: true, message: "Nhập số, ký hiệu văn bản" }]}
      >
        <Input name="title" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Nội dung trích yếu"
        name="content"
        rules={[{ required: true, message: "Nhập nội dung trích yếu" }]}
      >
        <Input.TextArea name="content" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Loại văn bản"
        name="type"
        rules={[{ required: true, message: "Nhập loại văn bản" }]}
      >
        <Select
          allowClear
          style={{ width: "100%" }}
          name="type"
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
          format="DD-MM-YYYY"
          style={{ width: "100%" }}
          name="published_date"
          onChange={handleDateChange}
        />
      </Form.Item>

      <Form.Item
        label="Cơ quan ban hành"
        name="organ"
        rules={[{ required: true, message: "Nhập cơ quan ban hành" }]}
      >
        <Input name="organ" value={profile.organ} onChange={handleChange} />
      </Form.Item>

      <Form.Item label="Số lượng bản gốc" name="original">
        <InputNumber
          style={{ width: "100%" }}
          name="original"
          value={profile.original}
          onChange={(value) =>
            handleChange({
              target: { name: "original", value },
            })
          }
        />
      </Form.Item>

      <Form.Item label="Số lượng bản chính" name="offical">
        <InputNumber
          style={{ width: "100%" }}
          name="offical"
          value={profile.official}
          onChange={(value) =>
            handleChange({
              target: { name: "offical", value },
            })
          }
        />
      </Form.Item>

      <Form.Item label="Số lượng bản photo" name="photo">
        <InputNumber
          style={{ width: "100%" }}
          name="photo"
          value={profile.photo}
          onChange={(value) =>
            handleChange({
              target: { name: "photo", value },
            })
          }
        />
      </Form.Item>

      <Form.Item label="Ghi chú" name="note">
        <Input.TextArea
          name="note"
          value={profile.note}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Tài liệu đính kèm"
        name="fileId"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn tài liệu đính kèm của dự án",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          name="fileId"
          value={profile.fileId}
          placeholder="Vui lòng chọn tài liệu đính kèm"
          onChange={(value) => handleSelectChange("fileId", value)}
          options={optionsFile}
        />
      </Form.Item>

      <Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => navigate(`progress/profile/detail/${id}`)}
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

export default ProgressProfileForm;
