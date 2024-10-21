// import { AuthContext } from "@/context/auth.context";
// import { useLogout } from "@/hooks/useLogout";
// import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout as AntLayout } from "antd";
// import Link from "next/link";
import { ReactNode } from "react";
import HeaderComponent from "./Header";
import SiderComponent from "./Sider";
import FooterComponent from "./Footer";
import '../../app/public/style.css'


const { Content } = AntLayout;

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {


    return (
        <AntLayout className="layout" style={{ minHeight: "100vh" }}>
            <SiderComponent />
            <AntLayout>
            <HeaderComponent />  
                <Content >
                    <div className="main-chilren">{children}</div>
                </Content>   
                <FooterComponent />   
            </AntLayout> 
        </AntLayout>
    );
}
