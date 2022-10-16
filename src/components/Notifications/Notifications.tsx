import { BellOutlined } from '@ant-design/icons';
import { Button, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';
import { StyledIcon } from '../Header/Guide';
import { StyledDrawer } from '../SidebarMenu/UpdateProfile';
import AddNoteModal from './AddNoteModal';
import CompleteNotifications from './CompleteNotifications';
import PlannedNotifications from './PlannedNotifications';

const { TabPane } = Tabs;

const Notifications = () => {
  const { notificationsArr, lang } = useAppSelector((state) => ({
    notificationsArr: state.options.data?.notificationsArr,
    lang: state.options.lang
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEdit = (id: number) => {
    setEditId(id);
  };

  const resetEditId = () => {
    setEditId(null);
  };

  return (
    <>
      <div className="absolute top-1 right-[70px] z-10 w-[36px]">
        <StyledIcon
          className="relative w-8 h-8 flex bigPhone:inline-flex justify-center items-center rounded-full bg-white cursor-pointer mr-1 mb-1 border-slate-600 border-[1px]"
          onClick={() => setIsOpen(true)}
        >
          <BellOutlined />
          {notificationsArr?.filter((note) => note.complete).length ? (
            <div className="absolute top-0 -left-1 h-3 w-3 bg-red-500 rounded-full text-[10px] flex justify-center items-center text-white font-semibold">
              {notificationsArr?.filter((note) => note.complete).length}
            </div>
          ) : null}
        </StyledIcon>
      </div>
      {isOpen && (
        <StyledDrawer
          fullMobileWidth={/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )}
          title={lang.notification[0]}
          onClose={closeModal}
          visible={isOpen}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={closeModal}>{lang.notification[1]}</Button>
            </Space>
          }
        >
          <>
            <AddNoteModal editId={editId} resetEditId={resetEditId} />
            <CenterTabs defaultActiveKey="1" type="card" onChange={() => {}}>
              <TabPane tab={lang.notification[3]} key="1">
                <CompleteNotifications />
              </TabPane>
              <TabPane tab={lang.notification[4]} key="2">
                <PlannedNotifications handleEdit={handleEdit} />
              </TabPane>
            </CenterTabs>
          </>
        </StyledDrawer>
      )}
    </>
  );
};

export default Notifications;

const CenterTabs = styled(Tabs)`
  margin: 1rem 0;
  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;
  }
`;
