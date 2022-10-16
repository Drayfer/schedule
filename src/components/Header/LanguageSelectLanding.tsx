import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import React from 'react';
import { localeArray } from '../../assets/constants/lang';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLandingLocale } from '../../store/reducers/LandingSlice';
import { useSetLandingLang } from '../helpers/useSetLandingLang';

const LanguageSelectLanding = () => {
  const { locale } = useAppSelector((state) => ({
    locale: state.landing.locale
  }));
  const dispatch = useAppDispatch();

  useSetLandingLang();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setLandingLocale(key));
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          key: localeArray[0],
          label: 'English'
        },
        {
          key: localeArray[1],
          label: 'Русский'
        },
        {
          key: localeArray[2],
          label: 'Українська'
        }
      ]}
    />
  );
  return (
    <div className="">
      <Dropdown overlay={menu}>
        <Space className="cursor-pointer">
          {locale.toLocaleUpperCase()}
          <DownOutlined className="absolute text-[10px] top-[23px]" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default LanguageSelectLanding;
