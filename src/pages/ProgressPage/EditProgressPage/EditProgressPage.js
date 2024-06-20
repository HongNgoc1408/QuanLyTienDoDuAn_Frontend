import React, { useEffect, useState } from "react";
import ProgressForm from "../../../components/ProgressComponent/ProgressForm";
import {
  editProgress,
  getProgressById,
} from "../../../services/ProgressService";
import { Spin, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "../../../services/UserService";
import { getProfile } from "../../../services/ProfileService";

const EditProgressPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [profileId, setProfileId] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgressById(id);
        setProgress({
          ...response,
        });
      } catch (error) {
        message.error("Không thể tải dữ liệu tiến độ dự án");
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();

        const formattedData = users.map((user) => ({
          label: user.id_user,
          value: user.id_user,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profiles = await getProfile();

        const formattedData = profiles.map((profile) => ({
          label: profile.title,
          value: profile.title,
        }));
        setProfileId(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress((prevProgress) => ({
      ...prevProgress,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);

    editProgress(id, progress)
      .then(() => {
        message.success("Tiến độ dự án đã được chỉnh sửa thành công");
        navigate("/progress");
      })
      .catch((error) => {
        message.error("Có lỗi xảy ra khi chỉnh sửa tiến độ dự án");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#1677FF",
          }}
        >
          Hiệu chỉnh tiến độ dự án
        </h2>
        <ProgressForm
          textButton="Hiệu chỉnh"
          options={data}
          optionsProfileId={profileId}
          progress={progress}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditProgressPage;
