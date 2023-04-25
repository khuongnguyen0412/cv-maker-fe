import { Menu } from "antd";
import menus from "./MenuList";
import { useNavigate } from "react-router-dom";

export default function MenuComponent(props: any) {
  const navigate = useNavigate();
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["/"]}
      onSelect={(e) => {
        navigate(e.key);
      }}
      items={menus}
    />
  );
}
