import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Spin, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../services/UserService";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [
  //     Table.SELECTION_ALL,
  //     Table.SELECTION_INVERT,
  //     Table.SELECTION_NONE,
  //   ],
  // };

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
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
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
      title: "Username",
      dataIndex: "username",
      ...getColumnSearchProps("username"),
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      key: "4",
      title: "Full Name",
      dataIndex: "fullName",
      ...getColumnSearchProps("fullName"),
    },
    {
      key: "5",
      title: "ID User",
      dataIndex: "id_user",
      ...getColumnSearchProps("id_user"),
    },
    {
      key: "6",
      title: "Created At",
      dataIndex: "created_at",
      ...getColumnSearchProps("created_at"),
    },
    {
      key: "7",
      title: "Updated At",
      dataIndex: "updated_at",
      ...getColumnSearchProps("updated_at"),
    },

    {
      key: "8",
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <span>
          <Link to={`edit/${record.key}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
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
      await deleteUser(id);
      message.success("Xóa người dùng thành công");
      setData(data.filter((item) => item.key !== id));
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa người dùng");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();

        const filteredUsers = users.filter((user) => !user.isAdmin);

        const formattedData = filteredUsers.map((user, index) => ({
          key: user._id,
          index: index + 1,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          id_user: user.id_user,
          created_at: user.formattedCreatedAt,
          updated_at: user.formattedUpdatedAt,
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
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1300 }}
      />
    </>
  );
};

export default UserTable;
