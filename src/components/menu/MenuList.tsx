import {
  HomeOutlined,
  FileDoneOutlined,
  UserOutlined,
  LogoutOutlined,
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
    key: "/account",
    icon: <UserOutlined />,
    label: "Account",
    children: [
      {
        key: "/account/logout",
        icon: <LogoutOutlined />,
        label: "Account",
      },
    ],
  },
];

export default menus;
