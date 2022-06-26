import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getSttistic } from '../../store/reducers/OptionsSlice';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import LessonsChart from './LessonsChart';

const Statistics = () => {
  const {
    lessons,
    students,
    userId,
    deletedStudents,
    monthLessons,
    totalLessons,
    monthIncome,
    totalIncome,
    weekIncome,
    currency
  } = useAppSelector((state) => ({
    lessons: state.lessons.data || [],
    students: state.student.data,
    userId: state.user.data?.id,
    deletedStudents: state.options.data?.deletedStudents,
    monthLessons: state.options.data?.monthLessons,
    totalLessons: state.options.data?.totalLessons,
    monthIncome: state.options.data?.monthIncome,
    totalIncome: state.options.data?.totalIncome,
    weekIncome: state.options.data?.weekIncome,
    currency: state.options.data?.currency
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      try {
        isErrorDispatch(dispatch(getSttistic(userId)));
      } catch (err) {
        PopupError(err);
      }
    }
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <Card
        type="inner"
        title="Lessons"
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <Col className="w-3/5">
            <p>Peer week:</p>
            <p>Peer month:</p>
            <p>Total:</p>
          </Col>
          <Col className="w-2/5">
            <p>{lessons.length}</p>
            <p>{monthLessons}</p>
            <p>{totalLessons}</p>
          </Col>
        </Row>
      </Card>

      <Card
        type="inner"
        title="Students"
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <Col className="w-3/5">
            <p>Active:</p>
            <p>Hide:</p>
            <p>Delete:</p>
          </Col>
          <Col className="w-2/5">
            <p>{students.filter((student) => !student.break).length}</p>
            <p>{students.filter((student) => student.break).length}</p>
            <p>{deletedStudents}</p>
          </Col>
        </Row>
      </Card>

      <Card
        type="inner"
        title="Finance"
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <Col className="w-3/5">
            <p>Per last week:</p>
            <p>Per last month:</p>
            <p>Total:</p>
          </Col>
          <Col className="w-2/5">
            <p>
              {weekIncome}{' '}
              <span className="text-xs text-slate-600">{currency}</span>
            </p>
            <p>
              {monthIncome}{' '}
              <span className="text-xs text-slate-600">{currency}</span>
            </p>
            <p>
              {totalIncome}{' '}
              <span className="text-xs text-slate-600">{currency}</span>
            </p>
          </Col>
        </Row>
      </Card>
      <Card
        type="inner"
        title="Intensity Graph"
        bordered={false}
        style={{ width: '100%' }}
      >
        <LessonsChart />
      </Card>
    </div>
  );
};

export default Statistics;
