import React from "react";
import { Typography } from "antd";
// import Layout from "@/components/Layout";

import Layout from "@/components/Layout/Layout";
import ListErrComponent from "@/components/list-err/list-err";

const { Title } = Typography;

export default function Home() {
  return (
    <Layout>
      <Title>Trang chủ </Title>
      <ListErrComponent/>
      
    </Layout>
  );
}
