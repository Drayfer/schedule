import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { editNotification } from '../../store/reducers/OptionsSlice';
import addNotification from 'react-push-notification';
const sound = require('../../assets/audio/sounds/notification2.wav');

const playSound = new Audio(sound);

const TimerNotifications = () => {
  const { notificationsArr, userId, optionsData } = useAppSelector((state) => ({
    notificationsArr: state.options.data?.notificationsArr,
    userId: state.user.data?.id,
    optionsData: state.options.data
  }));
  const [play, setPlay] = useState(0);

  const dispatch = useAppDispatch();

  const notificationMessage = (noteId: number) => {
    addNotification({
      title: `New notifications (+${
        notificationsArr?.filter((n) => n.complete).length
      })`,
      message: `${
        notificationsArr?.filter((n) => n.complete).reverse()[0].text
      }`,
      theme: 'darkblue',
      native: true // when using native, your OS will handle theming.
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!notificationsArr?.length) return;
    interval = setInterval(() => {
      notificationsArr.forEach((note) => {
        if (moment(note.date).isBefore(moment().utc()) && !note.complete) {
          dispatch(
            editNotification({
              userId: userId || 0,
              id: note.id,
              text: note.text,
              date: note.date,
              complete: true
            })
          );
        }

        if (
          note.complete &&
          play < notificationsArr.filter((n) => n.complete).length
        ) {
          playSound.volume = (optionsData?.notifyVolume || 100) / 100;
          playSound.play();
          notificationMessage(note.id);
        }
        setPlay(notificationsArr.filter((n) => n.complete).length);
      });
    }, 5000);
    return () => clearInterval(interval);
  });

  return <></>;
};

export default TimerNotifications;
