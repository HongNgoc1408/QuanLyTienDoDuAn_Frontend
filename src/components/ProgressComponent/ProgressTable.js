import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Popconfirm, Space, Spin, Table, message } from "antd";
import { deleteProgress, getProgresses } from "../../services/ProgressService";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const ProgressTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
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
    { key: "1", title: "STT", dataIndex: "index" },
    {
      key: "2",
      title: "Tên dự án",
      dataIndex: "title",

      ...getColumnSearchProps("title"),
    },
    {
      key: "3",
      title: "Mô tả dự án",
      dataIndex: "description",

      ...getColumnSearchProps("description"),
    },
    {
      key: "4",
      title: "Người được giao",
      dataIndex: "assigned_to",

      ...getColumnSearchProps("assigned_to"),
    },
    {
      key: "5",
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Chưa bắt đầu",
          value: "not_started",
        },
        {
          text: "Đang tiến hành",
          value: "in_progress",
        },
        {
          text: "Hoàn thành",
          value: "completed",
        },
        {
          text: "Bị hủy",
          value: "cancel",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },
    {
      key: "6",
      title: "Độ ưu tiên",
      dataIndex: "priority",
      filters: [
        {
          text: "Thấp",
          value: "low",
        },
        {
          text: "Trung bình",
          value: "medium",
        },
        {
          text: "Cao",
          value: "high",
        },
      ],
      onFilter: (value, record) => record.priority.startsWith(value),
      filterSearch: true,
    },
    {
      key: "7",
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      ...getColumnSearchProps("start_date"),
    },
    {
      key: "8",
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      ...getColumnSearchProps("end_date"),
    },
    {
      key: "9",
      title: "Hoạt động",
      dataIndex: "actions",
      fixed: "right",
      render: (_, record) => (
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
      ),
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
          assigned_to: Array.isArray(item.assigned_to)
            ? item.assigned_to.join(", ")
            : item.assigned_to,
          status: item.status,
          priority: item.priority,
          start_date: item.start_date,
          end_date: item.end_date,
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
        onChange={onChange}
        rowSelection={rowSelection}
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
