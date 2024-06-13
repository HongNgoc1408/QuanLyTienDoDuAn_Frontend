import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const DocPage = () => {
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((data) => {
      formData.append("files", data);
    });

    try {
      await axios.post("http://localhost:3001/api/docs/uploadFiles", formData);
      message.success("Files uploaded successfully");
      setFileList([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      message.error("Upload failed");
    }
  };

  const handleFileChange = ({ data, fileList }) => {
    setFileList(fileList);
  };

  const props = {
    onRemove: (data) => {
      setFileList(fileList.filter((item) => item.uid !== data.uid));
    },
    beforeUpload: (data) => {
      setFileList([...fileList, data]);
      return false;
    },
    fileList,
  };

  return (
    <div>
      <Upload {...props} multiple>
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        Upload Files
      </Button>
      
    </div>
  );
};

export default DocPage;
