import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Empty, message } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { removeNotification } from '../../store/reducers/OptionsSlice';

import { isErrorDispatch, PopupError } from '../helpers/PopupError';

interface PlannedNotificationsProps {
  handleEdit: (id: number) => void;
}

const PlannedNotifications = (props: PlannedNotificationsProps) => {
  const { handleEdit } = props;
  const { notificationsArr, userId, lang } = useAppSelector((state) => ({
    notificationsArr: state.options.data?.notificationsArr,
    userId: state.user.data?.id,
    lang: state.options.lang
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
      message.success(lang.notification[15]);
    } catch (err) {
      PopupError(err);
    }
  };

  return (
    <>
      {!notificationsArr?.filter((note) => !note.complete).length ? (
        <Empty
          className="opacity-50"
          imageStyle={{
            height: 60
          }}
          description={<span>{lang.notification[6]}</span>}
        ></Empty>
      ) : (
        <ul>
          {notificationsArr
            ?.filter((note) => !note.complete)
            .map((notification) => (
              <li
                key={notification.id}
                className="mb-2 bg-slate-50 cursor-default hover:bg-slate-50/30 border-[1px] rounded-md text-[13px]"
                onClick={() => setSelectNote(notification.id)}
                onMouseOver={() => setSelectNote(notification.id)}
                onMouseLeave={() => setSelectNote(0)}
              >
                <div className="flex justify-between rounded-t-md p-1 bg-[#FAFAFA] px-2 text-[11px] border-b-2">
                  <div>
                    {moment(notification.date).format('DD.MM.YY').toString()}
                  </div>
                  <div>
                    {moment(notification.date).format('HH:mm').toString()}
                  </div>
                </div>
                <div className="p-2 py-3 relative">
                  {notification.text}
                  <Action
                    show={selectNote === notification.id}
                    className="flex absolute top-0 p-2 text-[20px] gap-3 bg-slate-300/50 h-full rounded-md items-center"
                  >
                    <EditOutlined
                      className="cursor-pointer !text-[#41A8FB]"
                      onClick={() => handleEdit(notification.id)}
                    />
                    <DeleteOutlined
                      className="cursor-pointer !text-red-500"
                      onClick={() => handleDelete(notification.id)}
                    />
                  </Action>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default PlannedNotifications;

const Action = styled.div<{ show: boolean }>`
  right: ${(props) => (props.show ? '0px' : '-80px')};
  animation: ${(props) => props.show && '0.3s ease-in select'};
  @keyframes select {
    from {
      right: -80px;
    }
    to {
      right: 0px;
    }
  }
`;
