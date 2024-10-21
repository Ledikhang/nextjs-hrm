'use client';
import React, { useState } from 'react';
import { LaptopOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Layout, theme, Button, Image } from 'antd';
import { useRouter } from 'next/router';  // Thêm useRouter từ next/router
import { useSelectedMenu } from '@/hooks/useSelectedMenu';
import Link from 'next/link';
import '@/app/public/sider.css';
import logo from '@/app/public/logo.jpeg';
import { useCheckRole } from '@/hooks/useCheckRole';
import { UserRoles } from '@/enums/user-roles';

const { Sider } = Layout;

const SiderComponent: React.FC = () => {
    const router = useRouter();  // Sử dụng useRouter để điều hướng
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // Gọi useCheckRole trong component
    const { checkRole } = useCheckRole();

    // Định nghĩa các mục menu
    const items2: MenuProps['items'] = [
        {
            key: '1',
            icon: React.createElement(UserOutlined),
            label: 'Người dùng',
            children: [
                { key: '/user-list', label: 'Danh sách người dùng' },  // Đặt key là đường dẫn
            ],
        },
        ...(checkRole([UserRoles.OWNER, UserRoles.ADMIN]) ? [{
            key: '2',
            icon: React.createElement(LaptopOutlined),
            label: 'Quản lý về các lỗi',
            children: [
                { key: '/manage-err/add-err-view', label: 'Thêm thông tin lỗi' },  // Đặt key là đường dẫn
            ],
        }] : []),
    ];

    // Hàm xử lý khi một mục trong Menu được chọn
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);  // Điều hướng tới đường dẫn dựa trên key
    };

    const selectedMeu = useSelectedMenu();
    return (
        <>
            <Sider
                className='sider'
                trigger={null} collapsible collapsed={collapsed}
                breakpoint="lg"
                collapsedWidth="0"
                style={{ background: colorBgContainer }}
            >
                <Link href="/">
                    <Image
                        src={logo.src}
                        alt='logo'
                        preview={false}
                    />
                </Link>

                <Menu>
                    <Menu.Item>
                        <Link href="/">Trang chủ</Link>
                    </Menu.Item>
                </Menu>
                <Menu
                    selectedKeys={[selectedMeu]}
                    mode="inline"
                    style={{ height: 'auto', borderRight: 0 }}
                    items={items2}
                    onClick={handleMenuClick}  // Gọi hàm khi nhấn vào mục menu
                />
            </Sider>

            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </>
    );
};

export default SiderComponent;
