import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Spin, Table, message } from "antd";
import { deleteProgress, getProgresses } from "../../services/ProgressService";
import { Link } from "react-router-dom";

const ProgressTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "1",
    },
    {
      title: "Tên dự án",
      dataIndex: "title",
      key: "2",
    },
    {
      title: "Mô tả dự án",
      dataIndex: "description",
      key: "3",
    },
    {
      title: "Người được giao",
      dataIndex: "assigned_to",
      key: "4",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "5",
    },
    {
      title: "Độ ưu tiên",
      dataIndex: "priority",
      key: "6",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "7",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "8",
    },
    {
      title: "Hoạt động",
      dataIndex: "actions",
      key: "9",
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
