import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../managerState/useAuth";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Space, Table, Tag } from "antd";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;
// import logo from "./logo.svg";
// import "./App.css";
type MenuItem = Required<MenuProps>["items"][number];

interface employeeTypeData {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  birthday: Date;
  email: string;
  phoneNumber: string;
  address: string;
  position: string;
  imageUrl: string;
}

// interface DataType {
//   key: React.Key;
//   firstName: string;
//   lastName: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem("Order", "1", <PieChartOutlined />),

//   getItem("User", "sub1", <UserOutlined />, [
//     //call api employee
//     getItem("Tom", "3"),
//     getItem("Bill", "4"),
//     getItem("Alex", "5"),
//   ]),
//   getItem("Team", "sub2", <TeamOutlined />, [
//     getItem("Team 1", "6"),
//     getItem("Team 2", "8"),
//   ]),
//   getItem("Files", "9", <FileOutlined />),
// ];
function Index() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [employee, setEmployee] = useState<Array<employeeTypeData>>([]);
  const { auth } = UseAuth((state: any) => state);
  console.log("auth: ", auth);
  console.log("user: ", auth?.payload?.firstName);

  // const [packagePhoto, setPakagePhoto] = useState<Array<any>>([]);

  useEffect(() => {
    const getEmployees = async () => {
      await axios.get(`http://localhost:9000/employee`).then((results) => {
        console.log("kq:", results?.data?.result);
        setEmployee(results?.data?.result);
      });
    };
    getEmployees();
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            // items={items}
            className="pt-14"
          >
            <Menu.Item
              key="1"
              icon={<DesktopOutlined />}
              onClick={() => navigate("/package")}
            >
              Photography Package
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<PieChartOutlined />}
              onClick={() => navigate("/employee")}
            >
              Employee
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<FileOutlined />}
              onClick={() => navigate("/order")}
            >
              Order
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{ color: "white", fontSize: "25px" }}
            className="flex justify-between "
          >
            <h1>MANAGEMENT</h1>
            {auth ? (
              <>
                <h1>{auth?.payload?.firstName}</h1>
              </>
            ) : (
              <>
                <h1>Login</h1>
              </>
            )}
          </Header>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* đường dẫn ở đây */}
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer
            style={{ textAlign: "center", background: "#001529" }}
          ></Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;
