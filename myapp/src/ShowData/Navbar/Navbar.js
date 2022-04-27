import { Menu } from "antd";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
        <Menu.Item key="mail">
          <NavLink to={"/"}>Show Clients</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Navbar;
