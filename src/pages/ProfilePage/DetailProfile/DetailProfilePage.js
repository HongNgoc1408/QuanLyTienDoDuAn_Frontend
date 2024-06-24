import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProfileById } from "../../../services/ProfileService";
import { Spin, message } from "antd";
import ProfileDetail from "../../../components/ProfileComponent/ProfileDetail";

const DetailProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await getProfileById(id);
          setProfile({
            ...response,
          });
        } catch (error) {
          message.error("Không thể tải dữ liệu ho so dự án");
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }, [id]);

    if (loading) {
      return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      );
    }

  return (
    <div>
      <div style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}></div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#1677FF",
          }}
        >
          Chi tiết hồ sơ dự án
        </h2>
        <ProfileDetail
          profile={profile}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DetailProfilePage;
