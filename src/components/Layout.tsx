// import { AuthContext } from "@/context/auth.context";
// import { useLogout } from "@/hooks/useLogout";
// import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
// import { Layout as AntLayout, Avatar, Dropdown, Menu, Spin } from "antd";
// import Link from "next/link";
// import { ReactNode, useContext } from "react";

// const { Header, Content, Footer } = AntLayout;

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   const { mutate: logout, isLoading: isLoggingOut } = useLogout();
//   const { user, isLoading } = useContext(AuthContext)!;

//   if (isLoading) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <Spin size="large" />
//       </div>
//     );
//   }

//   const menu = (
//     <Menu>
//       <Menu.Item key="1" icon={<EditOutlined />}>
//         <Link href="/profile">Edit Profile</Link>
//       </Menu.Item>
//       <Menu.Item
//         key="2"
//         icon={<LogoutOutlined />}
//         onClick={() => logout()}
//         disabled={isLoggingOut}
//       >
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   return (
//     <AntLayout className="layout" style={{ minHeight: "100vh" }}>
//       <Header style={{ display: "flex", justifyContent: "space-between" }}>
//         <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
//           <Menu.Item key="1">
//             <Link href="/">Home</Link>
//           </Menu.Item>
//           <Menu.Item key="2">
//             <Link href="/user-list">About</Link>
//           </Menu.Item>
//         </Menu>

//         <Dropdown overlay={menu} placement="bottomRight" arrow>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//           >
//             <Avatar icon={<UserOutlined />} src={user?.avatar} />
//             <span style={{ color: "white", marginLeft: 8 }}>{user?.name}</span>
//           </div>
//         </Dropdown>
//       </Header>
//       <Content style={{ padding: "0 50px", marginTop: 64 }}>
//         <div className="site-layout-content">{children}</div>
//       </Content>
//       <Footer style={{ textAlign: "center" }}>
//         ©{new Date().getFullYear()} Created with by Truong Dinh
//       </Footer>
//     </AntLayout>
//   );
// }
