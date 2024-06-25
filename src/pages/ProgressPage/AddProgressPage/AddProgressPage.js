import { message } from "antd";
import React, { useEffect, useState } from "react";
import ProgressForm from "../../../components/ProgressComponent/ProgressForm";
import { addProgress } from "../../../services/ProgressService";
import { getUsers } from "../../../services/UserService";
import { getProfile } from "../../../services/ProfileService";

const AddProgressPage = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [profileId, setProfileId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
    title: "",
    description: "",
    manager: "",
    assignedTo: [],
    profileId: [],
    status: "",
    priority: "",
    start_date: null,
    end_date: null,
  });

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();
        console.log(users);

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
        // console.log(users);

        const managerUsers = users.filter((user) => user.role === "MANAGER");
        // console.log(managerUsers);
        const formatted = managerUsers.map((managerUser) => ({
          label: managerUser.id_user,
          value: managerUser.id_user,
          role: managerUser.role,
        }));

        console.log(formatted);
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
    const fetchData = async () => {
      try {
        const profiles = await getProfile();

        const formattedData = profiles.map((profile) => ({
          label: profile.title,
          value: profile._id,
          profile: {
            _id: profile._id,
            title: profile.title,
            content: profile.content,
            type: profile.type,
            published_date: profile.published_date,
            organ: profile.organ,
            quantity: profile.quantity,
            original: profile.original,
            official: profile.official,
            photo: profile.photo,
            note: profile.note,
            fileId: profile.fileId,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
          },
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
    // Map profileId values to include the full profile data
    const profiles = profileId
      .filter((p) => progress.profileId.includes(p.value))
      .map((p) => p.profile);

    addProgress({ ...progress, profileId: profiles })
      .then(() => {
        message.success("Thêm tiến độ dự án thành công");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        message.error("Có lỗi xảy ra khi thêm tiến độ dự án");
        console.error("Error:", error);
      });
  };

  return (
    // <Content
    //   style={{
    //     minHeight: 600,
    //     background: colorBgContainer,
    //     borderRadius: borderRadiusLG,
    //   }}
    // >
    <div>
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#1677FF",
          }}
        >
          Thêm tiến độ dự án
        </h2>
        <ProgressForm
          textButton="Thêm"
          options={data}
          options1={data1}
          optionsProfileId={profileId.map((p) => ({
            label: p.label,
            value: p.value,
          }))}
          progress={progress}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange} // Add this line
          loading={loading}
        />
      </div>
    </div>
    // </Content>
  );
};

export default AddProgressPage;
