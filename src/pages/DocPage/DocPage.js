// import React, { useState } from "react";
// import { Button, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { uploadMultipleFiles } from "../../services/DocService";

// const DocPage = () => {
//   const [fileList, setFileList] = useState([]);
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     fileList.forEach((file) => {
//       formData.append("files", file.originFileObj);
//       console.log(file.originFileObj);
//     });
//     console.log(formData);
//     try {
//       const uploadedData = await uploadMultipleFiles(formData);
//       message.success("Files uploaded successfully");
//       setFileList([]);
//       console.log(setFileList([]));
//       console.log("uploadedData", uploadedData.data);
//       if (uploadedData) {
//         setUploadedFiles(uploadedData);
//         console.log(uploadedData);
//       }
//     } catch (error) {
//       message.error("Upload failed");
//     }
//   };

//   const handleFileChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   const handleRemove = (file) => {
//     const newFileList = fileList.filter((item) => item.uid !== file.uid);
//     setFileList(newFileList);
//   };
//   const props = {
//     onRemove: handleRemove,
//     beforeUpload: (file) => {
//       setFileList([...fileList, file]);
//       return false;
//     },
//     fileList,
//   };

//   return (
//     <div>
//       <Upload {...props} multiple onChange={handleFileChange}>
//         <Button icon={<UploadOutlined />}>Select Files</Button>
//       </Upload>
//       <Button
//         type="primary"
//         onClick={handleUpload}
//         disabled={fileList.length === 0}
//         style={{ marginTop: 16 }}
//       >
//         Upload Files
//       </Button>
//     </div>
//   );
// };

// export default DocPage;
import React, { useState, useEffect } from "react";
import { Button, Upload, message, List } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  uploadMultipleFiles,
  getFiles,
  downloadFile,
} from "../../services/DocService";

const DocPage = () => {
  const [fileList, setFileList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
    } catch (error) {
      message.error("Upload failed");
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const viewFile = async (fileId) => {
    try {
      const file = await downloadFile(fileId);
      const contentType = file.type || "application/octet-stream"; // Fallback to a generic binary stream
      const url = URL.createObjectURL(new Blob([file], { type: contentType }));
      window.open(url);
    } catch (error) {
      message.error("Error viewing file");
    }
  };

  const props = {
    onRemove: handleRemove,
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div>
      <Upload {...props} multiple onChange={handleFileChange}>
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

      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Uploaded Files:</h3>
          <List
            bordered
            dataSource={uploadedFiles}
            renderItem={(file) => (
              <List.Item>
                <a
                  onClick={() => viewFile(file.id)}
                  style={{ cursor: "pointer" }}
                >
                  {file.docname}
                </a>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DocPage;
