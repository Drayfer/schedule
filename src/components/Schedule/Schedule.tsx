import {
  CheckCircleOutlined,
  CloseCircleFilled,
  CloseOutlined,
  DeleteOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  List,
  message,
  Popconfirm,
  Row,
  Switch,
  TimePicker,
  Tooltip
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ILesson } from '../../models/ILesson';
import { fetchDisciplines } from '../../store/reducers/DisciplineActions';
import {
  deleteLesson,
  deleteLessonsDay,
  getLessons,
  updateLesson
} from '../../store/reducers/LessonActions';
import {
  setActiveBoard,
  setSearchedStudent
} from '../../store/reducers/OptionsSlice';
import {
  fetchStudents,
  updateStudent
} from '../../store/reducers/StudentActions';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import AddLesson, { LittleRound } from './AddLesson';
import CornerButtons from './CornerButtons';

const Schedule = () => {
  const dispatch = useAppDispatch();
  const { userId, lessons, students, lessonssLoading, disciplines } =
    useAppSelector((state) => ({
      userId: state.user.data?.id,
      lessons: state.lessons.data || [],
      students: state.student.data,
      lessonssLoading: state.lessons.isLoading,
      disciplines: state.discipline.data
    }));

  const [currentDate, setCurrentDate] = useState<moment.Moment | null>(null);

  const [days, setDays] = useState<moment.Moment[]>([]);
  const weekStart = currentDate?.clone().startOf('isoWeek');
  const weekEnd = currentDate?.clone().endOf('isoWeek');

  const [changeTime, setChangeTime] = useState<number | null>(null);

  const toFindDuplicates = (arr: string[]) =>
    arr.filter((item, index) => arr.indexOf(item) !== index);

  const duplicates =
    lessons.length &&
    toFindDuplicates(lessons.map((lesson) => lesson.date.toString()));

  useEffect(() => {
    let interval = setInterval(() => {
      if (weekEnd && moment() > weekEnd) {
        setCurrentDate(moment());
      }
    }, 10000);
    return () => clearInterval(interval);
  });

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

    if (currentDate && userId && weekStart && weekEnd) {
      try {
        isErrorDispatch(dispatch(fetchStudents(userId)));
        isErrorDispatch(
          dispatch(
            getLessons({ userId, dateStart: weekStart, dateEnd: weekEnd })
          )
        );
        isErrorDispatch(dispatch(fetchDisciplines(userId)));
      } catch (err) {
        PopupError(err);
      }
    }
    // eslint-disable-next-line
  }, [currentDate, userId]);

  const dateHandler = (date: moment.Moment | null) => {
    if (date) setCurrentDate(date);
  };

  const actionButtons = (day: moment.Moment, index: number) => [
    <Popconfirm
      title="Are you sure to delete all lessons at this day?"
      icon={<CloseCircleFilled style={{ color: 'red' }} />}
      onConfirm={async () => {
        try {
          userId &&
            (await isErrorDispatch(
              dispatch(
                deleteLessonsDay({
                  userId,
                  dateStart: moment(weekStart).toDate(),
                  date: moment(weekStart).add(index, 'days').toDate()
                })
              )
            ));
        } catch (err) {
          PopupError(err);
        }
      }}
      okText="Yes"
      cancelText="No"
    >
      <DeleteOutlined key="delete" />
    </Popconfirm>,
    <AddLesson day={day} key="add" />,
    <EllipsisOutlined key="ellipsis" />
  ];

  return (
    <>
      <div className="flex justify-center relative">
        {weekStart && weekStart < moment().startOf('isoWeek') ? null : (
          <CornerButtons currentDate={currentDate} />
        )}

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
        {days.map((day, index) => (
          <Col key={day.toString()}>
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
              actions={actionButtons(day, index)}
            >
              <StyledList
                size="small"
                loading={lessonssLoading}
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
                      <ListItem
                        className={`flex justify-between ${
                          item.complete && 'bg-slate-300/50 rounded-md'
                        }`}
                      >
                        <div className="flex items-center">
                          <Tooltip
                            title={`discipline: ${
                              disciplines.find(
                                (discipline) =>
                                  discipline.id === item.disciplineId
                              )?.title || 'General'
                            }`}
                          >
                            <div
                              style={
                                item.disciplineId
                                  ? {
                                      backgroundColor: disciplines.find(
                                        (discipline) =>
                                          discipline.id === item.disciplineId
                                      )?.color
                                    }
                                  : {}
                              }
                              className="w-2 h-2 bg-slate-300 rounded mr-2"
                            />
                          </Tooltip>
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
                              className={`text-lg font-semibold w-16 cursor-pointer ${
                                !item.complete
                                  ? 'text-slate-600/90'
                                  : 'text-slate-400'
                              }`}
                              onClick={() => {
                                setChangeTime(item.id);
                                setTimeout(() => setChangeTime(null), 10000);
                              }}
                            >
                              <span className="font-roboto">
                                {moment(item.date).format('HH:mm')}
                              </span>
                            </div>
                          )}

                          <LittleRound
                            color={
                              students.find(
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
                            <Tooltip
                              title={`balance: ${
                                students.find(
                                  (st) =>
                                    st.id === item.studentId && st.showBalance
                                )?.balance || 'hidden'
                              }`}
                            >
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  dispatch(setActiveBoard('students'));
                                  dispatch(setSearchedStudent(item.studentId));
                                }}
                              >
                                {item.fullName}
                              </span>
                            </Tooltip>
                            {students.some(
                              (student) =>
                                student.id === item.studentId &&
                                !student.break &&
                                student.showBalance &&
                                student.balance < 0
                            ) && (
                              <Tooltip title="negative balance of lessons">
                                <sup className="bg-[#7c7474] text-white rounded-full px-1 text-[10px]">
                                  -
                                </sup>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                        <div className="flex">
                          <Switch
                            className={`${item.complete && 'opacity-30'}`}
                            size="small"
                            checked={item.complete}
                            onChange={async () => {
                              try {
                                await isErrorDispatch(
                                  dispatch(
                                    updateLesson({
                                      id: item.id,
                                      complete: !item.complete
                                    })
                                  )
                                );
                                await isErrorDispatch(
                                  dispatch(
                                    updateStudent({
                                      studentId: item.studentId,
                                      balance: item.complete ? 1 : -1
                                    })
                                  )
                                );
                              } catch (err) {
                                PopupError(err);
                              }
                            }}
                          />
                          {item.complete ? (
                            <CheckCircleOutlined className="ml-2 opacity-50" />
                          ) : (
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
                                  message.success(
                                    'Lesson deleted successfully.'
                                  );
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
                              />
                            </Popconfirm>
                          )}
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

const StyledList = styled(List)<{ renderItem?: any; complete?: boolean }>`
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

// const TimeFont = styled.span`
//   font-family: monospace;
// `;
