import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/UserComponent/UserTable"; // Adjust the import path as needed

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const UserPage = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigateToAddUserPage = () => {
    navigate("/user/add"); // Adjust the path as needed
  };

   const exportTableToExcel = () => {
     if (!tableRef.current) return;
     const table = tableRef.current;
     const workbook = XLSX.utils.table_to_book(table);
     const excelBuffer = XLSX.write(workbook, {
       bookType: "xlsx",
       type: "array",
     });
     const data = new Blob([excelBuffer], { type: "application/octet-stream" });
     saveAs(data, "User_Table.xlsx");
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
        <Col span={17}>
          <p style={{ paddingLeft: 50, fontSize: 20, fontWeight: "bold" }}>
            Quản lý người dùng
          </p>
        </Col>

        <Col span={4} style={{ padding: 10, textAlign: "end" }}>
          <Button
            icon={<PlusOutlined />}
            style={{
              fontWeight: "bold",
              fontSize: 15,
              height: 50,
            }}
            onClick={navigateToAddUserPage}
          >
            Thêm người dùng
          </Button>
        </Col>
        <Col span={3} style={{ padding: 10 }}>
          <Button
            onClick={exportTableToExcel}
            icon={<DownloadOutlined />}
            style={{
              fontWeight: "bold",
              fontSize: 15,
              height: 50,
            }}
          >
            Xuất file excel
          </Button>
        </Col>
      </Row>
      <div ref={tableRef}>
        <UserTable />
      </div>
    </Content>
  );
};

export default UserPage;
