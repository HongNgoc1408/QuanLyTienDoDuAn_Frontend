import {
  DeleteOutlined,
  DownloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Spin, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDoc, downloadFile, getFiles } from "../../services/DocService";
import Highlighter from "react-highlight-words";

const DocTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    { key: "1", title: "STT", dataIndex: "index", width: 70 },
    {
      key: "2",
      title: "Tên tài liệu",
      dataIndex: "docname",
      width: 600,
      ...getColumnSearchProps("docname"),
    },
    {
      key: "3",
      title: "Loại tài liệu",
      dataIndex: "contentType",
      width: 300,
      ...getColumnSearchProps("contentType"),
    },
    {
      key: "4",
      title: "Ngày tạo",
      dataIndex: "created_at",
      ...getColumnSearchProps("created_at"),
    },
    {
      key: "5",
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      ...getColumnSearchProps("updated_at"),
    },
    {
      key: "6",
      title: "",
      dataIndex: "actions",
      fixed: "right",
      render: (_, record) => (
        <span>
          <Link
            onClick={() => viewFile(record.key)}
            style={{ cursor: "pointer" }}
          >
            <Button type="primary">
              <DownloadOutlined style={{ fontSize: 18 }} />
            </Button>
          </Link>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tiến độ này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ marginLeft: 5 }}>
              <DeleteOutlined style={{ fontSize: 18 }} />
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const viewFile = async (fileId) => {
    try {
      const file = await downloadFile(fileId);
      const contentType = file.type || "application/octet-stream";
      const url = URL.createObjectURL(new Blob([file], { type: contentType }));
      window.open(url);
    } catch (error) {
      message.error("Error viewing file");
    }
  };
  const handleDelete = async (id) => {
    console.log("Deleting document with ID:", id);
    try {
      await deleteDoc(id);
      message.success("Xóa tài liệu dự án thành công");
      setData(data.filter((item) => item.key !== id));
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa tiến độ dự án");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getFiles();

        const formattedData = docs.map((item, index) => ({
          key: item.id,
          index: index + 1,
          docname: item.docname,
          contentType: item.contentType,
          data: item.data,
          created_at: item.formattedCreatedAt,
          updated_at: item.formattedUpdatedAt,
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

  if (loading) {
    return <Spin size="large" />;
  }
  return (
    <>
      <Table
        id="table-to-xls"
        onChange={onChange}
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1300,
        }}
      />
    </>
  );
};

export default DocTable;
