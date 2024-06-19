import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../../components/ProfileComponent/ProfileForm";
import { addProfile } from "../../../services/ProfileService";
import { getFiles } from "../../../services/DocService";
// import BreadcrumbComponent from "../../../components/BreadcrumbComponent/BreadcrumbComponent";

const AddProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    title: "",
    content: "",
    type: "",
    published_date: "",
    organ: "",
    quantity: "",
    note: "",
    fileId: [],
  });

  const options = [
    { label: "Nghị quyết - NQ", value: "Nghị quyết - NQ" },
    { label: "Nghị định - NĐ", value: "Nghị định - NĐ" },
    { label: "Quyết định - QĐ", value: "Quyết định - QĐ" },
    { label: "Chỉ thị - CT", value: "Chỉ thị - CT" },
    { label: "Quy chế - QC", value: "Quy chế - QC" },
    { label: "Quy định - QYĐ", value: "Quy định - QYĐ" },
    { label: "Thông Tư - TT", value: "Thông tư - TT" },
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
    { label: "Bản thỏa thuận - BTT", value: "Bản thỏa thuận - BTT" },
    { label: "Giấy ủy quyền - GUQ", value: "Giấy ủy quyền - GUQ" },
    { label: "Giấy mời - GM", value: "Giấy mời - GM" },
    { label: " Giấy giới thiệu - GGT", value: " Giấy giới thiệu - GGT" },
    { label: "Giấy nghỉ phép - GNP", value: "Giấy nghỉ phép - GNP" },
    { label: "Phiếu gửi - PG", value: "Phiếu gửi - PG" },
    { label: "Phiếu chuyển - PC", value: "Phiếu chuyển - PC" },
    { label: "Phiếu báo - PB", value: "Phiếu báo - PB" },
    { label: "Thư công", value: "Thư công" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getFiles();

        const formattedData = docs.map((doc) => ({
          label: doc.docname,
          value: doc.docname,
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
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    addProfile(profile)
      .then(() => {
        message.success("Hồ sơ đã được lưu thành công!");
        navigate("/profile");
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
        {/* <BreadcrumbComponent /> */}
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
          optionsFile={data}
          profile={profile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSelectChange={handleSelectChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddProfile;
