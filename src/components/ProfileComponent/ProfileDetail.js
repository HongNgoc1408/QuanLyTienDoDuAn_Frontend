import { DownloadOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { downloadFile, getFiles } from "../../services/DocService";

const ProfileDetail = ({ profile, loading }) => {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getFiles();

        const formattedData = docs.map((item, index) => ({
          key: item.id,
          index: index + 1,
          docname: item.docname,
          contentType: item.contentType,
          data: item.data,
          created_at: item.formattedCreatedAt,
          updated_at: item.formattedUpdatedAt,
        }));
        setDocs(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const viewFile = async (fileId) => {
    try {
      const doc = docs.find((doc) => doc.key === fileId);
      if (!doc) {
        message.error("Không tìm thấy tài liệu");
        return;
      }

      const file = await downloadFile(doc.key);
      const contentType = file.type || "application/octet-stream";
      const url = URL.createObjectURL(new Blob([file], { type: contentType }));
      window.open(url);
    } catch (error) {
      message.error("Lỗi khi xem tài liệu");
      console.error("Error:", error);
    }
  };

  return (
    <Form
      loading={isLoading}
      name="profile_form"
      layout="vertical"
      initialValues={{
        ...profile,
        published_date: profile.published_date
          ? dayjs(profile.published_date, "DD-MM-YYYY")
          : null,
      }}
    >
      <div>
        <Form.Item label="Số, ký hiệu văn bản" name="title">
          <span>{profile.title}</span>
        </Form.Item>
      </div>

      <Form.Item label="Nội dung trích yếu" name="content">
        <span>{profile.content}</span>
      </Form.Item>

      <Form.Item label="Loại văn bản" name="type">
        <span>{profile.type}</span>
      </Form.Item>

      <Form.Item label="Ngày phát hành" name="published_date">
        <span>{profile.published_date}</span>
      </Form.Item>

      <Form.Item label="Cơ quan ban hành" name="organ">
        <span>{profile.organ}</span>
      </Form.Item>

      <Form.Item label="Số lượng bản gốc" name="original">
        <span>{profile.original}</span>
      </Form.Item>

      <Form.Item label="Số lượng bản chính" name="offical">
        <span>{profile.offical}</span>
      </Form.Item>

      <Form.Item label="Số lượng bản photo" name="photo">
        <span>{profile.photo}</span>
      </Form.Item>

      <Form.Item label="Ghi chú" name="note">
        <span>{profile.note}</span>
      </Form.Item>

      <Form.Item label="Tài liệu đính kèm" name="fileId">
        {profile.fileId &&
          profile.fileId.map((fileId) => {
            const doc = docs.find((doc) => doc.docname === fileId);
            if (!doc) return null;

            return (
              <div key={doc.key}>
                <Link
                  onClick={() => viewFile(doc.key)}
                  style={{ cursor: "pointer", color: "#1890ff" }}
                >
                  <DownloadOutlined style={{ marginRight: 8 }} />
                  {doc.docname}
                </Link>
              </div>
            );
          })}
      </Form.Item>
      <Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => navigate("/profile")}
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

export default ProfileDetail;
