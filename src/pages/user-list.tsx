import React from "react";
import { Card, Typography } from "antd";
// import Layout from "@/components/Layout";
import UsersList from "@/components/UsersList";
import Layout from "@/components/Layout/Layout";

const { Title } = Typography;

export default function UserList() {
  return (
    <Layout>
      <Title>Trang chủ quản lý người dùng</Title>
      <Card title="Danh sách người dùng" style={{ marginTop: 16 }}>
        <UsersList />
      </Card>
    </Layout>
  );
}
