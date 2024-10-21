'use client';
import { Avatar, Dropdown, Menu } from "antd";
import Link from "next/link";
import { Layout as AntLayout } from "antd";
import '@/app/public/header.css'


import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { useLogout } from "@/hooks/useLogout";
import { AuthContext } from "@/context/auth.context";
import { useSelectedMenu } from "@/hooks/useSelectedMenu";


const { Header } = AntLayout;


export default function HeaderComponent() {
    const { mutate: logout, isLoading: isLoggingOut } = useLogout();
    const { user } = useContext(AuthContext)!;
    const selectedMeu = useSelectedMenu();
    const menu = (
        <Menu
            selectedKeys={[selectedMeu]}
        >
            <Menu.Item key="1" icon={<EditOutlined />}>
                <Link href="/profile">Edit Profile</Link>
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<LogoutOutlined />}
                onClick={() => logout()}
                disabled={isLoggingOut}
            >
                Logout
            </Menu.Item>
        </Menu>
    );


    return (
        <>
            <Header style={{ display: "flex", justifyContent: "space-between", padding: '0'}}>
          
                
                <Dropdown className="icon-user" overlay={menu} placement="bottomRight" arrow>
                    <div>
                        <Avatar icon={<UserOutlined />} src={user?.avatar} />
                        <span style={{ color: "white", marginLeft: 8 }}>{user?.name}</span>
                    </div>
                </Dropdown>
            </Header>

        </>

    );
}