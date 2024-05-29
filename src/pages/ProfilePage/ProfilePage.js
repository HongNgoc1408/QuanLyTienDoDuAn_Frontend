import React, { useState } from "react";
import ProfileForm from "../../components/ProfileComponent/ProfileForm";
import { addProfile } from "../../services/ProfileService";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    title: "",
    content: "",
    type: "",
    published_date: "",
    organ: "",
    quantity: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addProfile(profile)
      .then(() => {
        // Xử lý sau khi thêm hồ sơ thành công
        console.log("Profile added successfully!");
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h2>Create Profile</h2>
        <ProfileForm
          profile={profile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
