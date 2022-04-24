import { Button, Divider } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import Overview from '../../assets/images/overview.png';
import Students from '../../assets/images/students.png';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import { Menu, MenuProps } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined
} from '@ant-design/icons';
import { boolean } from 'yup';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Schedule', '1', <PieChartOutlined />),
  getItem('Students', '2', <DesktopOutlined />),
  getItem('Students', '3', <DesktopOutlined />),

  getItem('Settings', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6')
  ]),
  getItem('Students', '4', <DesktopOutlined />)
];

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <SideMenu collapsed={collapsed} className="phone:hidden tablet:block">
      <Burger onClick={toggleCollapsed} collapsed={collapsed}>
        <BurgerButton>
          {collapsed ? <UpOutlined /> : <DownOutlined />}
        </BurgerButton>
      </Burger>
      <div className="flex items-center justify-center bg-black h-28">
        <img src={Logo} alt="logo" className="w-8" />
        {!collapsed && (
          <h1 className="ml-3 font-semibold text-gray-500/70 text-lg mb-0 whitespace-nowrap font-sans overflow-hidden">
            Dashboard Kit
          </h1>
        )}
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ height: 'calc(100vh - 112px)' }}
      />
    </SideMenu>
  );
};

export default SidebarMenu;

const Burger = styled(Button)<{ collapsed?: boolean }>`
  margin-bottom: 16px;
  position: absolute;
  z-index: 999;
  bottom: 100px;
  /* left: ${({ collapsed }) => (collapsed ? '50px' : '225px')}; */
  right: -38px;
  padding: 0px;
  height: 0px;
  border: 0px;
  transform: rotate(90deg);
  color: white !important;
`;

const SideMenu = styled.div<{ collapsed?: boolean }>`
  position: relative;

  width: ${({ collapsed }) => (collapsed ? '80px' : '256px')};
  transition: ${({ collapsed }) =>
    collapsed ? 'none' : 'all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s'};
  & .ant-menu {
    transition: none;
  }
`;

const BurgerButton = styled.div`
  width: 44px;
  height: 0px;
  border-right: 7px solid transparent;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-left: 7px solid transparent;
  border-bottom: 18px solid #021529;
  text-align: center;
`;
