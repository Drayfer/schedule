import {
  CloseCircleFilled,
  CloseCircleTwoTone,
  CloseOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  List,
  message,
  Popconfirm,
  Row,
  Switch,
  TimePicker
} from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ILesson } from '../../models/ILesson';
import {
  deleteLesson,
  getLessons,
  updateLesson
} from '../../store/reducers/LessonActions';
import { fetchStudents } from '../../store/reducers/StudentActions';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import AddLesson, { LittleRound } from './AddLesson';

const Schedule = () => {
  const dispatch = useAppDispatch();
  const { userId, lessons, students } = useAppSelector((state) => ({
    userId: state.user.data?.id,
    lessons: state.lessons.data || [],
    students: state.student.data
  }));

  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(null);

  const [days, setDays] = useState<moment.Moment[]>([]);
  const weekStart = currentDate?.clone().startOf('isoWeek');
  const weekEnd = currentDate?.clone().endOf('isoWeek');

  const [changeTime, setChangeTime] = useState<number | null>(null);
  useEffect(() => {
    setCurrentDate(moment());
  }, []);

  useEffect(() => {
    const week = [];
    if (currentDate) {
      for (let i = 0; i <= 6; i++) {
        week.push(moment(weekStart).add(i, 'days'));
      }
      setDays(week);
    }

    if (userId && weekStart && weekEnd) {
      dispatch(fetchStudents(userId));
      try {
        isErrorDispatch(
          dispatch(
            getLessons({ userId, dateStart: weekStart, dateEnd: weekEnd })
          )
        );
      } catch (err) {
        PopupError(err);
      }
    }
  }, [currentDate, userId]);

  // console.log(1111, days);
  // useEffect(() => {
  //   if (userId) {
  //     try {
  //       isErrorDispatch(
  //         dispatch(
  //           getLessons({ userId, dateStart: weekStart, dateEnd: weekEnd })
  //         )
  //       );
  //     } catch (err) {
  //       PopupError(err);
  //     }
  //   }
  // }, [currentDate, userId]);

  const dateHandler = (date: moment.Moment | null) => {
    if (date) setCurrentDate(date);
  };

  // console.log(
  //   11111,
  //   lessons.map((item) => moment(item.date).day()).includes(1) ? 'sdsdsds' : 'n'
  // );

  return (
    <>
      <div className="flex justify-center">
        <Button
          onClick={() =>
            setCurrentDate(moment(currentDate).subtract(1, 'week'))
          }
        >
          Prev
        </Button>
        <DatePicker onChange={dateHandler} value={currentDate} picker="week" />
        <Button
          onClick={() => setCurrentDate(moment(currentDate).add(1, 'week'))}
        >
          Next
        </Button>
        {currentDate?.week() !== moment().week() && (
          <Button onClick={() => setCurrentDate(moment(moment()))}>
            Reset
          </Button>
        )}
      </div>
      <Row justify="center" gutter={[20, 5]}>
        {days.map((day) => (
          <Col>
            <LessonCard
              active={
                moment().format('DD.MM.YYYY') === day.format('DD.MM.YYYY')
              }
              size="small"
              title={moment(day).format('dddd')}
              extra={moment(day).format('DD.MM.YYYY')}
              style={{
                width: 300,
                marginTop: 16,
                zIndex: 0,
                height: 'calc(100% - 16px)'
              }}
              type="inner"
              actions={[
                <SettingOutlined key="setting" />,
                <AddLesson day={day} />,
                <EllipsisOutlined key="ellipsis" />
              ]}
            >
              <StyledList
                size="small"
                dataSource={
                  lessons
                    .map((item) => moment(item.date).day())
                    .includes(moment(day).day())
                    ? lessons
                    : []
                }
                renderItem={(item: ILesson) => (
                  <>
                    {day.date() === moment(item.date).date() && (
                      <ListItem className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-slate-300 rounded mr-2" />
                          {item.id === changeTime ? (
                            <TimePicker
                              format={'HH:mm'}
                              minuteStep={15}
                              value={moment(item.date)}
                              style={{ width: '80px' }}
                              onSelect={(t) => {
                                dispatch(
                                  updateLesson({ id: item.id, date: t })
                                );
                                setChangeTime(null);
                              }}
                            />
                          ) : (
                            <div
                              className="text-lg font-semibold w-16 text-blue-400 cursor-pointer"
                              onClick={() => setChangeTime(item.id)}
                            >
                              <TimeFont>
                                {moment(item.date).format('HH:mm')}
                              </TimeFont>
                            </div>
                          )}

                          <LittleRound
                            color={
                              students.find(
                                (student) => student.id === item.studentId
                              )?.color || '#bdbdbd'
                            }
                          />
                          <div className="leading-7">{item.fullName}</div>
                        </div>
                        <div className="flex">
                          <Switch
                            size="small"
                            checked={item.complete}
                            onChange={() => {
                              dispatch(
                                updateLesson({
                                  id: item.id,
                                  complete: !item.complete
                                })
                              );
                            }}
                          />
                          <Popconfirm
                            title="Are you sure to delete this lesson?"
                            icon={
                              <CloseCircleFilled style={{ color: 'red' }} />
                            }
                            onConfirm={async () => {
                              try {
                                await isErrorDispatch(
                                  dispatch(deleteLesson({ id: item.id }))
                                );
                                message.success('Lesson deleted successfully.');
                              } catch (err) {
                                PopupError(err);
                              }
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <CloseOutlined
                              twoToneColor="#c11071"
                              style={{ color: 'red' }}
                              className="ml-2 text-sm"
                              onClick={async () => {}}
                            />
                          </Popconfirm>
                        </div>
                      </ListItem>
                    )}
                  </>
                )}
              />
            </LessonCard>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Schedule;

const StyledList = styled(List)<{ renderItem?: any }>`
  .ant-empty-normal {
    margin: 0px !important;
  }
  /* .ant-empty-image {
    display: none;
  } */
  .ant-list-empty-text {
    padding: 0;
  }
`;

const ListItem = styled(List.Item)`
  padding: 0px 5px !important;
`;

const LessonCard = styled(Card)<{ active?: boolean }>`
  .ant-card-head {
    border-top-width: ${(props) => props.active && '4px'};
    border-top-color: ${(props) => props.active && '#3b92fc'};
  }
  .ant-card-body {
    height: ${(props) =>
      props.active ? 'calc(100% - 91px)' : 'calc(100% - 87px)'};
  }
`;

const TimeFont = styled.span`
  font-family: monospace;
`;
