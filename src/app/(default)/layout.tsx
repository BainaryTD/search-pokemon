"use client";
import React from "react";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer } = Layout;

const items = Array.from({ length: 2 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* Header */}
      {/* ใช้ Tailwind แทน inline style สำหรับการวาง layout (flex / align) */}
      <Header className="flex items-center justify-between">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          className="ml-auto w-full"
        />
      </Header>

      {/* Content */}
      {/* ใช้ Tailwind จัด padding, margin, ฯลฯ แล้วแทรก Style เฉพาะค่า Theme ที่มาแบบไดนามิก */}
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
      {/* ใช้ Tailwind สำหรับ text-center หรือ spacing ได้ */}
      <Footer className="text-center">
        Search Pokemon ©{new Date().getFullYear()} Created by Bainary
      </Footer>
    </Layout>
  );
}
