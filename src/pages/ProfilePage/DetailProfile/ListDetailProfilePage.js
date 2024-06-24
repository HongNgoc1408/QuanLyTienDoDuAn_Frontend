import React from "react";
import { Content } from "antd/es/layout/layout";
import {Col, Row, theme } from "antd";

import ProfileDetailTable from "../../../components/ProfileComponent/ProfileDetailTable";
const ListDetailProfilePage = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        minHeight: 600,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <div style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}></div>

      <Row>
        <Col span={17}>
          <p style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
            Hồ sơ dự án
          </p>
        </Col>
      </Row>
      <div>
        <ProfileDetailTable />
      </div>
    </Content>
  );
};

export default ListDetailProfilePage;
