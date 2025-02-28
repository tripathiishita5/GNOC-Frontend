import { Navigate, NavLink, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../store/userStore";
import { Breadcrumb, Button, Flex, Layout, Menu, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useState } from "react";
import {
  FundProjectionScreenOutlined,
  HomeFilled,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../Components/Logo";
import { Typography } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../htttp/api";
const { Text } = Typography;
const Protected = () => {
  const { user, logout: logOut } = useAuthStore();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const queryClient = useQueryClient();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      logOut();
    },
  });

  if (!user) {
    return <Navigate to={"/auth/login"} />;
  }

  const items = getMenueItems(user.role);
  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="p-5 pb-11">
            <Logo size={5} />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Flex justify="space-between" style={{ padding: "0 16px" }}>
              <div>
                <Text type="success">
                  <Space>
                    {user.role}
                    <UserOutlined />
                  </Space>
                </Text>
              </div>
              <div className="flex items-center gap-4">
                <div>Hello, {user.name}</div>
                <div>
                  <Button
                    onClick={logoutMutate}
                    style={{
                      background: "#820C59",
                      color: "white",
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </Flex>
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            SECURE METER ©{new Date().getFullYear()} Ishita t
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Protected;

// eslint-disable-next-line no-unused-vars
const getMenueItems = (role) => {
  const baseItems = [
    {
      key: "/",
      icon: <HomeFilled />,
      label: <NavLink to={"/"}>Home</NavLink>,
      priorty: 0,
    },
    {
      key: "/projects",
      icon: <FundProjectionScreenOutlined />,
      label: <NavLink to={"/projects"}>Projects</NavLink>,
      priorty: 0,
    },
  ];
  return baseItems.sort((a, b) => a.priorty - b.priorty);
};
