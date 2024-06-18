import React, { useEffect, useState } from "react";
import ProgressForm from "../../../components/ProgressComponent/ProgressForm";
import { addProgress } from "../../../services/ProgressService";
import { message } from "antd";
import { getUsers } from "../../../services/UserService";

const AddProgressPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({
    title: "",
    description: "",
    assigned_to: [],
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
    addProgress(progress)
      .then(() => {
        message.success("Thêm tiến độ dự án thành công");
        setTimeout(5);
        window.location.reload();
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
          progress={progress}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange}
          loading={loading}
        />
      </div>
    </div>
    // </Content>
  );
};

export default AddProgressPage;
