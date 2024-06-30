import { Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../../services/ProfileService";
import { getProgressById } from "../../../services/ProgressService";
import { getUsers } from "../../../services/UserService";
import ProgressDetail from "../../../components/ProgressComponent/ProgressDetail";

const DetailProgressPage = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [profileOptions, setProfileOptions] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getProgressById(id);
        console.log(response);
        setProgress({
          ...response,
          assignedTo: Array.isArray(response.assignedTo)
            ? response.assignedTo.join(", ")
            : response.assignedTo,
          profileId: response.profileId.length,
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
          Chi tiết tiến độ dự án
        </h2>
        <ProgressDetail
          options={data}
          options1={data1}
          optionsProfileId={profileOptions}
          progress={progress}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DetailProgressPage;
