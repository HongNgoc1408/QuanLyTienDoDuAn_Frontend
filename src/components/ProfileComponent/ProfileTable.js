import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Popconfirm, Space, Spin, Table, message } from "antd";
import { deleteProfile, getProfile } from "../../services/ProfileService";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const ProfileTable = () => {
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
      title: "Số, ký hiệu văn bản",
      dataIndex: "title",

      ...getColumnSearchProps("title"),
    },
    {
      key: "3",
      title: "Nội dung trích yếu văn bản",
      dataIndex: "content",

      ...getColumnSearchProps("content"),
    },
    {
      key: "4",
      title: "Loại văn bản",
      dataIndex: "type",

      ...getColumnSearchProps("type"),
    },
    {
      key: "5",
      title: "Ngày phát hành",
      dataIndex: "published_date",

      ...getColumnSearchProps("published_date"),
    },
    {
      key: "6",
      title: "Cơ quan ban hành",
      dataIndex: "organ",

      ...getColumnSearchProps("organ"),
    },
    {
      key: "7",
      title: "Số lượng bản",
      dataIndex: "quantity",

      ...getColumnSearchProps("quantity"),
    },
    {
      key: "8",
      title: "Ghi chú",
      dataIndex: "note",

      ...getColumnSearchProps("note"),
    },
    {
      key: "9",
      title: "Hoạt động",
      dataIndex: "actions",
      fixed: "right",
      render: (_, record) => (
        <span>
          <Link to={`edit/${record.key}`}>
            <Button type="primary">Edit</Button>
          </Link>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tiến độ này?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger style={{ marginLeft: 5 }}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

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
          type: Array.isArray(item.type)
            ? item.type.join(", ")
            : item.type,
          published_date: item.published_date,
          organ: item.organ,
          quantity: item.quantity,
          note: item.note,
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

export default ProfileTable;
