"use client";
import React from "react";
import { Layout, Menu, theme } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import Image from "antd";
import logo from '@/../public/logo.png'

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
    path: "/",
  }
];

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Layout>
      {/* Header */}
      <Header className="flex items-center justify-between !bg-white">
        <img src="/logo.png" alt="logo" style={{ height: 40 }} />
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[items.find(item => item.path === pathname)?.key || '']}
          items={items}
          className="w-full !flex !justify-end"
          onClick={(e) => {
            const selectedItem = items.find((item) => item.key === e.key);
            if (selectedItem) router.push(selectedItem.path);
          }}
        />
      </Header>

      {/* Content */}
      <Content className="px-12">
        <div
          className="mt-4 p-6"
          style={{
            background: colorBgContainer, // ใช้สีจาก antd theme
            minHeight: "100vh",
            borderRadius: borderRadiusLG, // ใช้ borderRadius จาก antd theme
          }}
        >
          {children}
        </div>
      </Content>

      {/* Footer */}
      <Footer className="text-center">
        Search Pokemon ©{new Date().getFullYear()} Created by Bainary
      </Footer>
    </Layout>
  );
}
