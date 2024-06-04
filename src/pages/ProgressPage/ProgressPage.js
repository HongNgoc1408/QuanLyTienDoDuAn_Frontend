import React, { useRef } from "react";
import { Content } from "antd/es/layout/layout";
import { Button, Col, Row, theme } from "antd";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProgressTable from "../../components/ProgressComponent/ProgressTable";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import { DownloadTableExcel } from "react-export-table-to-excel";
const ProgressPage = () => {
  const navigate = useNavigate();
  const tableRef = useRef();
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
      <div style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
        <BreadcrumbComponent />
      </div>

      <Row>
        <Col span={20}>
          <p style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
            Quản lý tiến độ dự án
          </p>
        </Col>

        <Col span={4} style={{ padding: 10 }}>
          {/* textAlign: "end", marginLeft: 80 */}
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
        {/* <Col style={{ padding: 10, textAlign: "end" }}>
          <DownloadTableExcel
            filename="Progresses Table"
            sheet="Progresses"
            currentTableRef={tableRef.current}
          >
            <Button
              icon={<DownloadOutlined />}
              style={{
                fontWeight: "bold",
                fontSize: 15,
                height: 50,
              }}
            >
              Xuất file excel
            </Button>
          </DownloadTableExcel>
        </Col> */}
      </Row>
      <ProgressTable ref={tableRef} />
    </Content>
  );
};

export default ProgressPage;
