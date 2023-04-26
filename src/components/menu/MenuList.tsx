import {
  HomeOutlined,
  FileDoneOutlined,
  UserOutlined,
  LogoutOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

const menus = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "/my-cv",
    icon: <FileDoneOutlined />,
    label: "My CV",
  },
  {
    key: "/my-cv/add",
    icon: <FileAddOutlined />,
    label: "Add New",
  },
  {
    key: "/account",
    icon: <UserOutlined />,
    label: "Account",
    children: [
      {
        key: "/account/logout",
        icon: <LogoutOutlined />,
        label: "Logout",
      },
    ],
  },
];

export default menus;
