import { notification } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import addNotification from 'react-push-notification';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getTodayLessons } from '../../store/reducers/OptionsSlice';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
const sound = require('../../assets/audio/sounds/notification.mp3');

const playSound = new Audio(sound);

const PushNotification = () => {
  const { lessons, userId, todayLessons, optionsData, lang } = useAppSelector(
    (state) => ({
      lessons: state.lessons.data || [],
      userId: state.user.data?.id,
      todayLessons: state.options.todayLessons,
      optionsData: state.options.data,
      lang: state.options.lang
    })
  );
  const dispatch = useAppDispatch();

  const notificationMessage = (name: string, dif: number) => {
    if (window.ReactNativeWebView) {
      const webViewNotification = {
        title: lang.lesson[0],
        body: `${name} - ${lang.lesson[1]} ${dif} ${lang.lesson[2]}!`
      };
      window.ReactNativeWebView.postMessage(
        JSON.stringify(webViewNotification)
      );
    }

    addNotification({
      title: lang.lesson[0],
      subtitle: name,
      message: `${name} - ${lang.lesson[1]} ${dif} ${lang.lesson[2]}!`,
      theme: 'darkblue',
      native: true // when using native, your OS will handle theming.
    });
    return notification[`info`]({
      message: lang.lesson[0],
      description: `${name} - ${lang.lesson[1]} ${dif} ${lang.lesson[2]}!`,
      duration: 10
    });
  };
  const [todayDate, setTodayDate] = useState(moment());
  const [play, setPlay] = useState(true);

  const setTodayLessons = async () => {
    if (!userId) return;
    try {
      await isErrorDispatch(
        dispatch(getTodayLessons({ userId, date: moment().toDate() }))
      );
    } catch (err) {
      PopupError(err);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (todayDate) {
      interval = setInterval(() => {
        if (todayDate.format('DD-MM-YYYY') !== moment().format('DD-MM-YYYY')) {
          setTodayDate(moment());
        }
      }, 10000);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (userId && todayDate) {
      setTodayLessons();
    }
    // eslint-disable-next-line
  }, [userId, todayDate, lessons]);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!todayLessons || !todayLessons.length) return;
    interval = setInterval(() => {
      todayLessons.forEach((lesson) => {
        if (
          moment().format('DD.MM.YYYY HH:mm') >=
            moment(lesson.date)
              .subtract(optionsData?.notifyMinutes || 3, 'minutes')
              .format('DD.MM.YYYY HH:mm') &&
          moment().format('DD.MM.YYYY HH:mm') <
            moment(lesson.date).format('DD.MM.YYYY HH:mm') &&
          play &&
          optionsData?.notification
        ) {
          notificationMessage(
            lesson.fullName,
            moment(moment(lesson.date).diff(moment()))
              .add(1, 'minutes')
              .minutes()
          );
          playSound.volume = (optionsData.notifyVolume || 100) / 100;
          playSound.play();
          setPlay(false);
        } else if (
          moment().format('DD.MM.YYYY HH:mm') >=
            moment(lesson.date).format('DD.MM.YYYY HH:mm') &&
          moment().format('DD.MM.YYYY HH:mm') <
            moment(lesson.date).add(9, 'minutes').format('DD.MM.YYYY HH:mm') &&
          !play
        ) {
          setPlay(true);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  return <></>;
};

export default PushNotification;
