import "./index.css";
import MainLayout from "../../components/layout/MainLayout";
import {
  Button,
  Space,
  Table,
  Tag,
  Modal,
  Divider,
  Tooltip,
  notification,
} from "antd";
import cvService from "../../services/cv.service";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

export default function List() {
  const [dataSource, setDataSource] = useState<ICv[]>();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData().then((res) => {
      setDataSource(res.data.data.list);
      setLoading(false);
    });
  }, []);

  const fetchData = () => {
    return cvService.getAll();
  };

  const handleDelete = (record: any) => {
    confirm({
      title: "Do you want to delete this CV?",
      content: "Once you delete it you will not be able to recover it!",
      async onOk() {
        cvService.delete(record.id).then((res) => {
          if (res.data.success) {
            notification.success({
              message: "Delete CV Successfully!",
            });
            setDataSource(
              dataSource?.filter((item: any) => item.id !== record.id)
            );
          } else {
            notification.error({
              message: "Delete CV Failed!",
            });
          }
        });
      },
      onCancel() {},
    });
  };

  const handleDownloadPDF = async (key: string) => {
    const res = await cvService.downloadPDF(key);
    if (res.data.success) {
      window.open(res.data.data.url);
    } else {
      notification.error({
        message: "Download PDF Failed!",
      });
    }
  };

  const columns: ColumnsType<ICv> = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (record) => <span>{record}</span>,
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      width:'200px',
      render: (_, { skills }) => {
        return skills.map((skill: any) => {
          return (
            <Tag color={"green"} key={skill}>
              {skill}
            </Tag>
          );
        });
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => (
        <Tooltip title={moment(record).format("YYYY-MM-DD")}>
          <span key={record}>{moment(record).fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (record) => (
        <Tooltip title={moment(record).format("YYYY-MM-DD")}>
          <span key={record}>{moment(record).fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle" key={_}>
          <Button
            icon={<DownloadOutlined />}
            style={{ backgroundColor: "green", color: "white" }}
            onClick={async () => await handleDownloadPDF(record.path)}
          >
            Download PDF
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/my-cv/edit/${record.id}`)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
      <div className="container">
        <Divider style={{ fontSize: "28px" }}>MY CV</Divider>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={"id"}
          loading={loading}
        />
      </div>
  );
}
