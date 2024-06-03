import React from "react";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Row, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProgressTable from "../../components/ProgressComponent/ProgressTable";

const ProgressPage = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigateToAddProgressPage = () => {
    navigate("/progress/add");
  };
  return (
    <Content
      style={{
        minHeight: 600,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Row>
        <Col span={20}>
          <p style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
            Quản lý tiến độ dự án
          </p>
        </Col>

        <Col span={4} style={{ padding: 10 }}>
          <Button
            icon={<PlusOutlined />}
            style={{
              fontWeight: "bold",
              fontSize: 15,
              height: 50,
            }}
            onClick={navigateToAddProgressPage}
          >
            Thêm tiến độ dự án
          </Button>
        </Col>
      </Row>
      {/* <h3 style={{ paddingLeft: 10, fontWeight: "bold" }}>
        Danh sách tiến độ dự án
      </h3> */}
      <ProgressTable />
    </Content>
  );
};

export default ProgressPage;
