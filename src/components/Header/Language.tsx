import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import React, { useEffect } from 'react';
import { lang, localeArray } from '../../assets/constants/lang';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLang, setLocale } from '../../store/reducers/OptionsSlice';

const Language = () => {
  const { userId, locale } = useAppSelector((state) => ({
    userId: state.user.data?.id || 0,
    locale: state.options?.data?.locale || 'en'
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLang(lang[locale]));
  }, [locale, dispatch]);

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setLocale({ userId, locale: key }));
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
    <div className="absolute top-[10px] right-8 z-10">
      <Dropdown overlay={menu}>
        <Space className="cursor-pointer">
          {locale.toUpperCase()}
          <DownOutlined className="absolute text-[10px] top-[7px]" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default Language;
