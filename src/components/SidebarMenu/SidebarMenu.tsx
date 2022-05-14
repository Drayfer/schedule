import { Avatar, Button, Col, Popover } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

import { Menu, MenuProps } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { reset } from '../../store/reducers/UserSlice';
import { setActiveBoard, setFullMenu } from '../../store/reducers/OptionsSlice';

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
  getItem('Schedule', 'schedule', <PieChartOutlined />),
  getItem('Students', 'students', <DesktopOutlined />)
  // getItem('Statistics', 'statistics', <DesktopOutlined />),

  // getItem('Settings', 'sub1', <MailOutlined />, [
  //   getItem('Option 5', '5'),
  //   getItem('Option 6', '6')
  // ]),
  // getItem('Students', '4', <DesktopOutlined />),

  // getItem('Students', '100', <DesktopOutlined />)
];

const SidebarMenu = () => {
  const dispatch = useAppDispatch();
  const { activeBoard, user, fullMenu } = useAppSelector((state) => ({
    activeBoard: state.options.activeBoard,
    user: state.user,
    fullMenu: state.options.fullMenu
  }));
  const [collapsed, setCollapsed] = React.useState(!fullMenu);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    dispatch(setFullMenu());
  };

  const avatarContent = () => {
    return (
      <div>
        <div className="font-medium text-base text-slate-500 cursor-pointer border-b pb-1.5 pl-5 pr-5">
          Profile
        </div>
        <div
          className="font-medium text-base text-slate-500 cursor-pointer pt-1.5 pl-5 pr-5"
          onClick={() => dispatch(reset())}
        >
          Log Out
        </div>
      </div>
    );
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
        defaultSelectedKeys={[`${activeBoard}`]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ height: 'calc(100vh - 112px)' }}
        onClick={({ key }) => dispatch(setActiveBoard(key))}
      />
      <MenuBottom>
        <Popover placement="topRight" content={avatarContent()} trigger="click">
          <Avatar
            size={40}
            style={
              collapsed
                ? {
                    backgroundColor: '#817c78',
                    marginLeft: '10px',
                    cursor: 'pointer'
                  }
                : {
                    backgroundColor: '#d49c70c9',
                    cursor: 'pointer',
                    marginLeft: '5px'
                  }
            }
          >
            {user.data?.name.slice(0, 1)}
          </Avatar>
        </Popover>
        {!collapsed && (
          <Col className="ml-2">
            <div className="text-sm font-normal text-slate-50">
              {user.data?.name}
            </div>
          </Col>
        )}
      </MenuBottom>
    </SideMenu>
  );
};

export default SidebarMenu;

const Burger = styled(Button)<{ collapsed?: boolean }>`
  margin-bottom: 16px;
  position: absolute;
  z-index: 999;
  bottom: 100px;
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

const MenuBottom = styled.div`
  width: 256px;
  height: 60px;
  background-color: #031e3c;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 8px;
`;
