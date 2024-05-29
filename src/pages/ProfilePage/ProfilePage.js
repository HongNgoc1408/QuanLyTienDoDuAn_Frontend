import { Layout } from "antd";
import React from "react";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const ProfilePage = () => {
  return (
    <div>
      <Layout>
        <HeaderComponent />
        <FooterComponent />
      </Layout>
    </div>
  );
};

export default ProfilePage;
