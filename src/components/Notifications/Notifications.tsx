import { BellOutlined } from '@ant-design/icons';
import { Button, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';
import { StyledDrawer } from '../SidebarMenu/UpdateProfile';
import AddNoteModal from './AddNoteModal';
import CompleteNotifications from './CompleteNotifications';
import PlannedNotifications from './PlannedNotifications';

const { TabPane } = Tabs;

const Notifications = () => {
  const { notificationsArr } = useAppSelector((state) => ({
    notificationsArr: state.options.data?.notificationsArr
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
      <Bell className="absolute top-1 right-2 z-10 w-[36px]">
        <div
          className="relative w-8 h-8 flex bigPhone:inline-flex justify-center items-center rounded-full bg-white cursor-pointer mr-1 mb-1"
          onClick={() => setIsOpen(true)}
        >
          <BellOutlined />
          {notificationsArr?.filter((note) => note.complete).length ? (
            <div className="absolute top-0 -left-1 h-3 w-3 bg-red-500 rounded-full text-[10px] flex justify-center items-center text-white font-semibold">
              {notificationsArr?.filter((note) => note.complete).length}
            </div>
          ) : null}
        </div>
      </Bell>
      {isOpen && (
        <StyledDrawer
          fullMobileWidth={/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )}
          className=""
          title="Notifications"
          onClose={closeModal}
          visible={isOpen}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={closeModal}>Cancel</Button>
            </Space>
          }
        >
          <>
            <AddNoteModal editId={editId} resetEditId={resetEditId} />
            <CenterTabs defaultActiveKey="1" type="card" onChange={() => {}}>
              <TabPane tab="Done" key="1">
                <CompleteNotifications />
              </TabPane>
              <TabPane tab="Planned" key="2">
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

const Bell = styled.div`
  @media (max-width: 400px) {
    left: 8px;
  }
`;
