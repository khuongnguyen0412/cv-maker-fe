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
        if (e.key === "/account/logout") {
          localStorage.removeItem("token");
          navigate("/login");
        }else{
          navigate(e.key);
        }
      }}
      items={menus}
    />
  );
}
