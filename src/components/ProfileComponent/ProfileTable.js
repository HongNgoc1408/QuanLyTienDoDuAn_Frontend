import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Spin, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { deleteProfile, getProfile } from "../../services/ProfileService";

const { Column, ColumnGroup } = Table;

const ProfileTable = () => {
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

  const handleDelete = async (id) => {
    try {
      await deleteProfile(id);
      message.success("Xóa hồ sơ thành công");
      setData(data.filter((item) => item.key !== id));
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa hồ sơ dự án");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profilees = await getProfile();

        const formattedData = profilees.map((item, index) => ({
          key: item._id,
          index: index + 1,
          title: item.title,
          content: item.content,
          type: Array.isArray(item.type) ? item.type.join(", ") : item.type,
          published_date: item.published_date,
          organ: item.organ,
          original: item.original,
          offical: item.offical,
          photo: item.photo,
          note: item.note,
          fileId: Array.isArray(item.fileId)
            ? item.fileId.join(" ")
            : item.fileId,
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
    <Table
      onChange={onChange}
      // rowSelection={rowSelection}
      dataSource={data}
      scroll={{
        x: 1300,
      }}
    >
      <Column title="STT" dataIndex="index" key="index" width={60} />
      <Column
        title="Số, ký hiệu văn bản"
        dataIndex="title"
        key="title"
        width={200}
        {...getColumnSearchProps("title")}
      />
      <Column
        width={400}
        title="Nội dung trích yếu văn bản"
        dataIndex="content"
        key="content"
        {...getColumnSearchProps("content")}
      />
      <Column
        width={200}
        title="Loại văn bản"
        dataIndex="type"
        key="type"
        {...getColumnSearchProps("type")}
      />
      <Column
        width={200}
        title="Ngày phát hành"
        dataIndex="published_date"
        key="published_date"
        {...getColumnSearchProps("published_date")}
      />
      <Column
        width={250}
        title="Cơ quan ban hành"
        dataIndex="organ"
        key="organ"
        {...getColumnSearchProps("organ")}
      />
      <ColumnGroup title="Số lượng bản">
        <Column
          width={100}
          title="Bản gốc"
          dataIndex="original"
          key="original"
          sorter={(a, b) => a.original - b.original}
        />
        <Column
          width={100}
          title="Bản chính"
          dataIndex="offical"
          key="offical"
          sorter={(a, b) => a.offical - b.offical}
        />
        <Column
          width={100}
          title="Bản photo"
          dataIndex="photo"
          key="photo"
          sorter={(a, b) => a.photo - b.photo}
        />
      </ColumnGroup>
      <Column
        width={300}
        title="Ghi chú"
        dataIndex="note"
        key="note"
        {...getColumnSearchProps("note")}
      />
      <Column
        width={250}
        title="Tài liệu đính kèm"
        dataIndex="fileId"
        key="fileId"
        {...getColumnSearchProps("fileId")}
        
      />
      <Column
        width={150}
        title=""
        key="actions"
        fixed="right" // Để cố định bên phải
        render={(_, record) => {
          const user = JSON.parse(localStorage.getItem("user"));
          const isAdmin = user && user.isAdmin;

          return isAdmin ? (
            <span>
              <Link to={`edit/${record.key}`}>
                <Button type="primary">
                  <EditOutlined style={{ fontSize: 18 }} />
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
          ) : null;
        }}
      />
    </Table>
  );
};

export default ProfileTable;
