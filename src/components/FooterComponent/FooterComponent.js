import { Footer } from "antd/es/layout/layout";
import React from "react";

const FooterComponent = () => {
  return (
    <div>
      <Footer
        style={{
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        ©{new Date().getFullYear()} Created by Ngoc, Quan, Thuan
      </Footer>
    </div>
  );
};

export default FooterComponent;
