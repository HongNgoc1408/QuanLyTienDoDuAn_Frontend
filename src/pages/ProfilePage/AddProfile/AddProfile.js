import React, { useState } from "react";
import ProfileForm from "../../../components/ProfileComponent/ProfileForm";
import { addProfile } from "../../../services/ProfileService";
import { message } from "antd";
import BreadcrumbComponent from "../../../components/BreadcrumbComponent/BreadcrumbComponent";

const AddProfile = () => {
  const [profile, setProfile] = useState({
    title: "",
    content: "",
    type: "",
    published_date: "",
    organ: "",
    quantity: "",
    note: "",
  });

  const options = [
    { label: "Nghị quyết - NQ", value: "Nghị quyết - NQ" },
    { label: "Quyết định - QĐ", value: "Quyết định - QĐ" },
    { label: "Chỉ thị - CT", value: "Chỉ thị - CT" },
    { label: "Quy chế - QC", value: "Quy chế - QC" },
    { label: "Quy định - QYĐ", value: "Quy định - QYĐ" },
    { label: "Thông cáo - TC", value: "Thông cáo - TC" },
    { label: "Thông báo - TB", value: "Thông báo - TB" },
    { label: "Hướng dẫn - HD", value: "Hướng dẫn - HD" },
    { label: "Chương trình - CTr", value: "Chương trình - CTr" },
    { label: "Kế hoạch - KH", value: "Kế hoạch - KH" },
    { label: "Phương án - PA", value: "Phương án - PA" },
    { label: "Đề án - ĐA", value: "Đề án - ĐA" },
    { label: "Dự án - DA", value: "Dự án - DA" },
    { label: "Báo cáo - BC", value: "Báo cáo - BC" },
    { label: "Biên bản - BB", value: "Biên bản - BB" },
    { label: "Tờ trình - TTr", value: "Tờ trình - TTr" },
    { label: "Hợp đồng - HĐ", value: "Hợp đồng - HĐ" },
    { label: "Công văn", value: "Công văn" },
    { label: "Công điện - CĐ", value: "Công điện - CĐ" },
    { label: "Bản ghi nhớ - BGN", value: "Bản ghi nhớ - BGN" },
  ];

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
        message.success("Hồ sơ đã được lưu thành công!");
        setTimeout(5);
        window.location.reload();
      })
      .catch((error) => {
        message.error("Lỗi: Hồ sơ không thể được lưu.");
        console.error("Error:", error);
      });
  };

  const handleSelectChange = (name, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div>
      <div style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
        <BreadcrumbComponent />
      </div>
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
          Thêm hồ sơ dự án
        </h2>
        <ProfileForm
          textButton="Thêm"
          options={options}
          profile={profile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default AddProfile;
