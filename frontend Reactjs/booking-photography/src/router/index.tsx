import { useState, useEffect } from "react";
import axios from "axios";
import { UseAuth } from "../managerState/useAuth";

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Breadcrumb, Layout, theme } from "antd";

// import App from "../App";
import Login from "../components/login/index";
import PhotoPackage from "../components/photoPackage/index";
import Order from "../components/order/index";
import MenuBar from "../components/menu/index";

const { Header, Content, Footer, Sider } = Layout;

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

function Router() {
  const { auth } = UseAuth((state: any) => state);
  const [collapsed, setCollapsed] = useState(false);
  const [employee, setEmployee] = useState<Array<employeeTypeData>>([]);
  console.log("auth: ", auth);
  console.log("user: ", auth?.payload?.firstName);
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
    <>
      <div>
        <BrowserRouter>
          {!auth && (
            <Content>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
            </Content>
          )}

          {/* ////////////////////////// */}
          {auth && (
            <Layout style={{ minHeight: "100vh" }}>
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className="demo-logo-vertical" />

                <MenuBar />
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
                  {/* <Breadcrumb style={{ margin: "16px 0" }}>
              
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb> */}
                  {/* <div
                    style={{
                      padding: 24,
                      minHeight: 360,
                      background: colorBgContainer,
                    }}
                  >
                    Bill is a cat.
                  </div> */}
                  <Routes>
                    {/* <Route path="/" element={<MainPage />}></Route> */}
                    <Route path="/package" element={<PhotoPackage />}></Route>
                    <Route path="/order" element={<Order />}></Route>
                  </Routes>
                </Content>
                <Footer
                  style={{ textAlign: "center", background: "#001529" }}
                ></Footer>
              </Layout>
            </Layout>
          )}
        </BrowserRouter>
      </div>
    </>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<MainPage />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //     <Route path="/app" element={<App />}></Route>
    //   </Routes>

    // </BrowserRouter>
  );
}

export default Router;
