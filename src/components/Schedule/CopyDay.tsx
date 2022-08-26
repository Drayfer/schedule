import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Calendar, Empty, message, Modal, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { copyCurrentDay } from '../../store/reducers/LessonActions';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import type { Moment } from 'moment';
import { LessonCard, ListItem, StyledList } from './Schedule';
import { ILesson } from '../../models/ILesson';
import { LittleRound } from './AddLesson';
import axios from 'axios';
import { getTokenHeader } from '../helpers/getTokenHeader';

interface AddLessonProps {
  day: moment.Moment;
  weekStart: moment.Moment | null;
}

const CopyDay = (props: AddLessonProps) => {
  const { day, weekStart } = props;
  const { students, userId, lang, locale, disciplines } = useAppSelector(
    (state) => ({
      students: state.student.data,
      userId: state.user.data?.id,
      lang: state.options.lang,
      locale: state.options.data.locale,
      disciplines: state.discipline.data
    })
  );

  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calendarDay, setCalendarDay] = useState<ILesson[]>([]);
  const [selectDay, setSelectDay] = useState<moment.Moment>(
    moment(day).subtract(1, 'week')
  );

  const handleSelect = async (value: Moment) => {
    setSelectDay(value);
    const { data } = await axios.post<ILesson[]>(
      `${process.env.REACT_APP_API_URL}/lesson/calendar/${userId}`,
      { date: value },
      getTokenHeader()
    );
    setCalendarDay(data);
  };

  useEffect(() => {
    if (isModalVisible) {
      handleSelect(selectDay);
    }
    // eslint-disable-next-line
  }, [isModalVisible]);

  const toFindDuplicates = (arr: string[]) =>
    arr.filter((item, index) => arr.indexOf(item) !== index);

  const duplicates =
    calendarDay.length &&
    toFindDuplicates(calendarDay.map((lesson) => lesson.date.toString()));

  const handleSave = async () => {
    if (userId && weekStart) {
      try {
        await isErrorDispatch(
          dispatch(
            copyCurrentDay({
              userId,
              date: selectDay,
              currentDate: day,
              weekStart
            })
          )
        );
        handleCancel();
        message.success(lang.schedule[23]);
      } catch (err) {
        PopupError(err);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectDay(moment(day).subtract(1, 'week'));
    setCalendarDay([]);
  };

  return (
    <>
      <MenuUnfoldOutlined key="copy" onClick={() => setIsModalVisible(true)} />
      <Modal
        title={`${lang.schedule[24]} ${day.format('dddd, DD.MM.YYYY')}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okText={lang.schedule[25]}
      >
        <div className="flex gap-4 flex-col-reverse items-center bigPhone:flex-row bigPhone:items-start">
          <div className="w-[250px] rounded-md">
            <CustomCalendar
              fullscreen={false}
              value={selectDay}
              disabledDate={(current) => {
                let customDate = moment(day, 'DD.MM.YYYY');
                return (
                  customDate.weekday() !== current.weekday() ||
                  current > moment(customDate).subtract(1, 'week')
                );
              }}
              onSelect={handleSelect}
            />
          </div>
          <LessonCard
            size="small"
            title={
              moment(selectDay)
                .locale(locale)
                .format('dddd')
                .charAt(0)
                .toUpperCase() +
              moment(selectDay).locale(locale).format('dddd').slice(1)
            }
            extra={moment(selectDay).format('DD.MM.YYYY')}
            style={{
              width: 300,
              marginTop: 16,
              zIndex: 0,
              height: 'calc(100% - 16px)'
            }}
            type="inner"
          >
            <StyledList
              size="small"
              locale={{
                emptyText: (
                  <div>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={lang.schedule[20]}
                    />
                  </div>
                )
              }}
              dataSource={
                calendarDay.length &&
                calendarDay
                  .map((item) => moment(item.date).day())
                  .includes(moment(selectDay).day())
                  ? calendarDay
                  : []
              }
              renderItem={(item: ILesson) => (
                <>
                  {selectDay.date() === moment(item.date).date() && (
                    <ListItem className="flex justify-between">
                      <div className="flex items-center">
                        <Tooltip
                          title={`${lang.schedule[12].toLowerCase()}: ${
                            disciplines?.find(
                              (discipline) =>
                                discipline.id === item.disciplineId
                            )?.title || lang.schedule[1]
                          }`}
                        >
                          <div
                            style={
                              item.disciplineId
                                ? {
                                    backgroundColor: disciplines?.find(
                                      (discipline) =>
                                        discipline.id === item.disciplineId
                                    )?.color
                                  }
                                : {}
                            }
                            className="w-2 h-2 bg-slate-300 rounded mr-2"
                          />
                        </Tooltip>

                        <div
                          className={`text-lg font-semibold w-16 cursor-pointer text-slate-600/90`}
                        >
                          <span className="font-roboto">
                            {moment(item.date).format('HH:mm')}
                          </span>
                        </div>

                        <LittleRound
                          color={
                            students?.find(
                              (student) => student.id === item.studentId
                            )?.color || '#bdbdbd'
                          }
                        />
                        <div
                          className={`leading-7 ${
                            duplicates &&
                            duplicates.includes(item.date.toString()) &&
                            'bg-red-400/50 rounded'
                          }`}
                        >
                          <span>{item.fullName}</span>
                        </div>
                      </div>
                    </ListItem>
                  )}
                </>
              )}
            />
          </LessonCard>
        </div>
      </Modal>
    </>
  );
};

export default CopyDay;

const CustomCalendar = styled(Calendar)`
  .ant-picker-calendar-header .ant-picker-calendar-mode-switch {
    display: none;
    margin: 0;
  }
`;
