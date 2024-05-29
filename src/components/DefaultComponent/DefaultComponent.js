import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import { Layout } from "antd";
import FooterComponent from "../FooterComponent/FooterComponent";

const DefaultComponent = ({ children }) => {
  return (
    <Layout>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </Layout>
  );
};

export default DefaultComponent;
