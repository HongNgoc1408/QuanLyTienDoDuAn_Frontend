import { Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProgressForm from "../../../components/ProgressComponent/ProgressForm";
import { getProfile } from "../../../services/ProfileService";
import {
  editProgress,
  getProgressById,
} from "../../../services/ProgressService";
import { getUsers } from "../../../services/UserService";

const EditProgressPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [profileOptions, setProfileOptions] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgressById(id);
        setProgress({
          ...response,
          profileId: response.profileId.map((profile) => profile._id),
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
        const staffUsers = users.filter((user) => user.role === "STAFF");
        const formattedData = staffUsers.map((staffUser) => ({
          label: staffUser.id_user,
          value: staffUser.id_user,
          role: staffUser.role,
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
        const users = await getUsers();
        const managerUsers = users.filter((user) => user.role === "MANAGER");
        const formatted = managerUsers.map((managerUser) => ({
          label: managerUser.id_user,
          value: managerUser.id_user,
          role: managerUser.role,
        }));
        setData1(formatted);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await getProfile();
        const formattedData = profiles.map((profile) => ({
          label: profile.title,
          value: profile._id,
          profile: profile,
        }));
        setProfileOptions(formattedData);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
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

    const profiles = profileOptions
      .filter((p) => progress.profileId.includes(p.value))
      .map((p) => p.profile);

    editProgress(id, { ...progress, profileId: profiles })
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
          options1={data1}
          optionsProfileId={profileOptions}
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
