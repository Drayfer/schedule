import React from 'react';
import styled from 'styled-components';
import {
  TeamOutlined,
  ScheduleOutlined,
  PieChartOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';

import { Menu, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setActiveBoard,
  setSearchedStudent
} from '../../store/reducers/OptionsSlice';

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
  getItem('', 'students', <TeamOutlined />),
  getItem('', 'disciplines', <PieChartOutlined />),
  getItem('', 'schedule', <ScheduleOutlined />),
  getItem('', 'statistics', <BarChartOutlined />),
  getItem('', 'settings', <SettingOutlined />)
];

const FooterMenu = () => {
  const dispatch = useAppDispatch();
  const { activeBoard } = useAppSelector((state) => ({
    activeBoard: state.options.activeBoard,
    user: state.user,
    fullMenu: state.options.fullMenu
  }));

  return (
    <>
      <StyledMenu
        defaultSelectedKeys={[`${activeBoard}`]}
        selectedKeys={[`${activeBoard}`]}
        onClick={({ key }) => {
          dispatch(setActiveBoard(key));
          dispatch(setSearchedStudent(null));
        }}
        mode="horizontal"
        items={items}
        theme="dark"
      />
    </>
  );
};

export default FooterMenu;

const StyledMenu = styled(Menu)`
  &::before {
    display: none;
  }
  &::after {
    display: none;
  }
  display: flex;
  justify-content: space-around;
  li > span:last-child {
    display: none;
  }
  li {
    width: 19.99%;
    text-align: center;
  }
`;
