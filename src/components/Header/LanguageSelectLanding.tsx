import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import React, { useLayoutEffect } from 'react';
import { localeArray } from '../../assets/constants/lang';
import { lang } from '../../assets/constants/lang';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setLandingLang,
  setLandingLocale
} from '../../store/reducers/LandingSlice';

const LanguageSelectLanding = () => {
  const { locale } = useAppSelector((state) => ({
    locale: state.landing.locale
  }));
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!locale) {
      dispatch(setLandingLocale(navigator.language.split('-')[0]));
    } else {
      dispatch(setLandingLang(lang[locale]));
    }
    // eslint-disable-next-line
  }, [locale]);

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
