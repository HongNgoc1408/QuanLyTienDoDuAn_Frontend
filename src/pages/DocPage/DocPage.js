import React, { useState, useEffect } from "react";
import { Button, Upload, message, theme, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadMultipleFiles, getFiles } from "../../services/DocService";
import { Content } from "antd/es/layout/layout";
import DocTable from "../../components/DocComponent/DocTable";

const DocPage = () => {
  const [fileList, setFileList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const files = await getFiles();
        setUploadedFiles(files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      const uploadedData = await uploadMultipleFiles(formData);
      message.success("Files uploaded successfully");
      setFileList([]);
      setUploadedFiles(uploadedData);
      setTimeout(5);
      window.location.reload();
    } catch (error) {
      message.error(
        "Upload failed! Payload document size is larger than maximum of 16777216."
      );
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const props = {
    onRemove: handleRemove,
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
    accept: ".jpg,.jpeg,.png,.pdf,.docx,.xlxs",
  };

  return (
    <Content
      style={{
        minHeight: 600,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Row>
        <Col>
          <p style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
            Quản lý tài liệu dự án
          </p>
        </Col>
      </Row>
      <Row style={{ padding: 10, textAlign: "start" }}>
        <Col style={{ marginLeft: 50 }}>
          <Upload {...props} multiple onChange={handleFileChange}>
            <Button
              icon={<UploadOutlined />}
              style={{
                fontWeight: "bold",
                fontSize: 15,
                height: 50,
              }}
            >
              Thêm tài liệu dự án
            </Button>
          </Upload>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            style={{
              fontWeight: "bold",
              fontSize: 15,
              height: 50,
              marginLeft: 5,
            }}
          >
            Upload
          </Button>
        </Col>
      </Row>
      <DocTable files={uploadedFiles} />
    </Content>
  );
};

export default DocPage;
