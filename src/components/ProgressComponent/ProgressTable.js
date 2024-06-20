import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Spin, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { deleteProgress, getProgresses } from "../../services/ProgressService";

const ProgressTable = () => {
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
    { key: "1", title: "STT", dataIndex: "index", width: 60 },
    {
      key: "2",
      width: 300,
      title: "Tên dự án",
      dataIndex: "title",

      ...getColumnSearchProps("title"),
    },
    {
      key: "3",
      width: 400,
      title: "Mô tả dự án",
      dataIndex: "description",

      ...getColumnSearchProps("description"),
    },
    {
      key: "4",
      width: 200,
      title: "Người được giao",
      dataIndex: "assignedTo",

      ...getColumnSearchProps("assignedTo"),
    },
    {
      key: "5",
      width: 200,
      title: "Hồ sơ",
      dataIndex: "profileId",

      ...getColumnSearchProps("profileId"),
    },
    {
      key: "6",
      width: 150,
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Chưa bắt đầu",
          value: "Chưa bắt đầu",
        },
        {
          text: "Đang tiến hành",
          value: "Đang tiến hành",
        },
        {
          text: "Hoàn thành",
          value: "Hoàn thành",
        },
        {
          text: "Chậm tiến độ",
          value: "Chậm tiến độ",
        },
        {
          text: "Bị hủy",
          value: "Bị hủy",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },
    {
      key: "7",
      width: 150,
      title: "Độ ưu tiên",
      dataIndex: "priority",
      filters: [
        {
          text: "Thấp",
          value: "Thấp",
        },
        {
          text: "Trung bình",
          value: "Trung bình",
        },
        {
          text: "Cao",
          value: "Cao",
        },
      ],
      onFilter: (value, record) => record.priority.startsWith(value),
      filterSearch: true,
    },
    {
      key: "8",
      width: 150,
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      ...getColumnSearchProps("start_date"),
    },
    {
      key: "9",
      width: 150,
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      ...getColumnSearchProps("end_date"),
    },
    {
      key: "10 ",
      width: 150,
      title: "Ngày tạo",
      dataIndex: "created_at",
      ...getColumnSearchProps("created_at"),
    },
    {
      key: "11",
      width: 150,
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      ...getColumnSearchProps("updated_at"),
    },
    {
      key: "12",
      width: 150,
      title: "",
      dataIndex: "actions",
      fixed: "right", // Để cố định bên phải
      render: (_, record) => {
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
              title="Bạn có chắc chắn muốn xóa người dùng này?"
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
      },
    },
  ];

  const handleDelete = async (id) => {
    try {
      await deleteProgress(id);
      message.success("Xóa tiến độ dự án thành công");
      setData(data.filter((item) => item.key !== id));
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa tiến độ dự án");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const progresses = await getProgresses();

        const formattedData = progresses.map((item, index) => ({
          key: item._id,
          index: index + 1,
          title: item.title,
          description: item.description,
          assignedTo: Array.isArray(item.assignedTo)
            ? item.assignedTo.join(", ")
            : item.assignedTo,
          profileId: Array.isArray(item.profileId)
            ? item.profileId.join(", ")
            : item.profileId,
          status: item.status,
          priority: item.priority,
          start_date: item.start_date,
          end_date: item.end_date,
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

export default ProgressTable;
