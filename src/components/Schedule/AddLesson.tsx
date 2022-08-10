import { EditOutlined, SwapRightOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  TimePicker
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createLesson } from '../../store/reducers/LessonActions';
import { PopupError } from '../helpers/PopupError';
import { Round } from '../Students/Students';

const { Option } = Select;

interface AddLessonProps {
  day: moment.Moment;
}

const AddLesson = (props: AddLessonProps) => {
  const { day } = props;
  const { students, userId, lessons, lessonssLoading, lang } = useAppSelector(
    (state) => ({
      students: state.student.data,
      userId: state.user.data?.id,
      lessons: state.lessons.data || [],
      lessonssLoading: state.lessons.isLoading,
      lang: state.options.lang
    })
  );

  const dayLessons = lessons?.filter(
    (item) => moment(item.date).date() === day.date()
  );
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [time, setTime] = useState<moment.Moment>(moment());
  const [activeStudent, setActiveStudent] = useState<number | null>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<number | null>(null);

  useEffect(() => {
    if (dayLessons) {
      const lastLessonDate =
        dayLessons.length && moment(dayLessons[dayLessons.length - 1].date);
      const date = moment(
        lastLessonDate
          ? lastLessonDate
          : moment(day).set('hours', moment().hours())
      ).add(1, 'hours');
      setTime(date.hour() === 0 ? date.subtract(1, 'hour') : date);
    }
    // eslint-disable-next-line
  }, [isModalVisible]);

  const handleAdd = async () => {
    try {
      if (!activeStudent || !userId) return;
      if (
        dayLessons.length &&
        dayLessons.some((lesson) => moment(lesson.date).isSame(time))
      ) {
        throw new Error(
          `${lang.schedule[7]} ${time.format('HH:mm [in] ddd')} ${
            lang.schedule[8]
          }`
        );
      }
      const response = await dispatch(
        createLesson({
          date: time,
          studentId: activeStudent,
          userId,
          disciplineId: activeDiscipline
        })
      );

      if (response.hasOwnProperty('error'))
        throw new Error(JSON.stringify(response.payload));
      setActiveStudent(null);
      setIsModalVisible(false);
      setActiveDiscipline(null);
      message.success(lang.schedule[9]);
    } catch (err) {
      PopupError(err);
    }
  };

  const onChangeDiscipline = (e: RadioChangeEvent) => {
    setActiveDiscipline(e.target.value);
  };

  return (
    <>
      <EditOutlined key="edit" onClick={() => setIsModalVisible(true)} />
      <Modal
        title={day.format('dddd, DD.MM.YYYY')}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <div className="flex justify-center">
          <TimePicker
            format={'HH:mm'}
            minuteStep={15}
            value={time}
            onSelect={(t) => setTime(t)}
          />

          <Select
            showSearch
            placeholder={lang.schedule[10]}
            optionFilterProp="children"
            onChange={(id) => {
              setActiveStudent(id);
              setActiveDiscipline(null);
            }}
            filterOption={(inputValue, option) => {
              if (
                option?.props?.children?.props?.children[1]?.props?.children
              ) {
                return option.props.children.props.children[1].props.children
                  .join('')
                  .toLowerCase()
                  .includes(inputValue.toLowerCase());
              } else {
                return true;
              }
            }}
            value={activeStudent}
            style={{ width: 200 }}
          >
            {students &&
              students
                .filter((student) => !student.break)
                .map((student) => {
                  return (
                    <Option key={student.id} value={student.id}>
                      {
                        <div className="flex items-center">
                          <LittleRound color={student.color} />
                          <div>
                            {student.name} {student.surname}
                          </div>
                        </div>
                      }
                    </Option>
                  );
                })}
          </Select>
          <Button type="primary" onClick={handleAdd} loading={lessonssLoading}>
            {lang.schedule[11]}
          </Button>
        </div>

        <div className="flex justify-center mt-3">
          <Space direction="vertical">
            <div
              className={`text-gray-500/70 font-bold text-sm mr-3 mb-[3px] ${
                !activeDiscipline ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {lang.schedule[12]} <SwapRightOutlined className="ml-2" />
            </div>
            {students
              ?.find((student) => student.id === activeStudent)
              ?.disciplines.map((item) => (
                <div
                  className={`text-gray-500/70 font-bold text-sm mr-3 mb-[3px] ${
                    item.id === activeDiscipline ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {lang.schedule[12]} <SwapRightOutlined className="ml-2" />
                </div>
              ))}
          </Space>
          <Radio.Group onChange={onChangeDiscipline} value={activeDiscipline}>
            <Space direction="vertical" className="text-sm">
              <Radio value={null} defaultChecked>
                {lang.schedule[1]}
              </Radio>
              {students
                ?.find((student) => student.id === activeStudent)
                ?.disciplines.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.title}
                  </Radio>
                ))}
            </Space>
          </Radio.Group>
        </div>
      </Modal>
    </>
  );
};

export default AddLesson;

export const LittleRound = styled(Round)`
  width: 8px;
  height: 8px;
  margin-right: 3px;
`;
