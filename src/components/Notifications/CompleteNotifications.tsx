import { DeleteOutlined } from '@ant-design/icons';
import { Button, Empty, message } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  allCompleteNotification,
  removeNotification
} from '../../store/reducers/OptionsSlice';

import { isErrorDispatch, PopupError } from '../helpers/PopupError';

const CompleteNotifications = () => {
  const { notificationsArr, userId } = useAppSelector((state) => ({
    notificationsArr: state.options.data?.notificationsArr,
    userId: state.user.data?.id
  }));

  const dispatch = useAppDispatch();
  const [selectNote, setSelectNote] = useState(0);

  const handleDelete = (id: number) => {
    try {
      isErrorDispatch(
        dispatch(
          removeNotification({
            userId: userId || 0,
            noteId: id
          })
        )
      );
      message.success('Notification removed successfully.');
    } catch (err) {
      PopupError(err);
    }
  };

  const handleClearAll = () => {
    try {
      isErrorDispatch(
        dispatch(
          allCompleteNotification({
            userId: userId || 0
          })
        )
      );
      message.success('Notifications removed successfully.');
    } catch (err) {
      PopupError(err);
    }
  };

  return (
    <>
      {!notificationsArr?.filter((note) => note.complete).length ? (
        <Empty
          className="opacity-50"
          imageStyle={{
            height: 60
          }}
          description={<span>No notifications</span>}
        ></Empty>
      ) : (
        <>
          <ul>
            {notificationsArr
              ?.filter((note) => note.complete)
              .reverse()
              .map((notification) => (
                <li
                  key={notification.id}
                  className="mb-2 bg-blue-50 cursor-default hover:bg-blue-50/30 border-[1px] rounded-md text-[13px]"
                  onClick={() => setSelectNote(notification.id)}
                  onMouseOver={() => setSelectNote(notification.id)}
                  onMouseLeave={() => setSelectNote(0)}
                >
                  <div className="flex justify-between rounded-t-md p-1 bg-[#FAFAFA] px-2 pl-6 text-[11px] border-b-2">
                    <div>
                      {moment(notification.date).format('DD.MM.YY').toString()}
                    </div>
                    <div>
                      {moment(notification.date).format('HH:mm').toString()}
                    </div>
                  </div>
                  <div className="p-2 py-3 relative">
                    <div className="absolute w-3 h-3 -top-[20px] left-[7px] rounded-full bg-emerald-500" />
                    {notification.text}
                    <Action
                      show={selectNote === notification.id}
                      className="flex absolute top-0 p-2 text-[20px] gap-3 bg-slate-300/50 h-full rounded-md items-center"
                    >
                      <DeleteOutlined
                        className="cursor-pointer !text-red-500"
                        onClick={() => handleDelete(notification.id)}
                      />
                    </Action>
                  </div>
                </li>
              ))}
          </ul>
          <div className="flex justify-center">
            <Button onClick={handleClearAll}>Clear all</Button>
          </div>
        </>
      )}
    </>
  );
};

export default CompleteNotifications;

const Action = styled.div<{ show: boolean }>`
  right: ${(props) => (props.show ? '0px' : '-80px')};
  animation: ${(props) => props.show && '0.2s ease-in select'};
  @keyframes select {
    from {
      right: -80px;
    }
    to {
      right: 0px;
    }
  }
`;
