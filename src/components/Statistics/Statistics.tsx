import { Card, Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getSttistic } from '../../store/reducers/OptionsSlice';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import PaidAccess from '../Settings/PaidAccess';
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
    currency,
    lang,
    billing
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
    currency: state.options.data?.currency,
    lang: state.options.lang,
    billing: state.options.billing
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

  useEffect(() => {
    if (!billing?.paidDays && billing?.demo) {
    }
  });

  return (
    <div className="relative">
      <PaidAccess />
      <div className="flex justify-center gap-4 flex-wrap">
        <Card
          type="inner"
          title={lang.statistics[0]}
          bordered={false}
          style={{ width: 300 }}
        >
          <Row>
            <Col className="w-3/5">
              <p>{lang.statistics[1]}:</p>
              <p>{lang.statistics[2]}:</p>
              <p>{lang.statistics[3]}:</p>
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
          title={lang.statistics[4]}
          bordered={false}
          style={{ width: 300 }}
        >
          <Row>
            <Col className="w-3/5">
              <p>{lang.statistics[5]}:</p>
              <p>{lang.statistics[6]}:</p>
              <p>{lang.statistics[7]}:</p>
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
          title={lang.statistics[8]}
          bordered={false}
          style={{ width: 300 }}
        >
          <Row>
            <Col className="w-3/5">
              <p>{lang.statistics[9]}:</p>
              <p>{lang.statistics[10]}:</p>
              <p>{lang.statistics[11]}:</p>
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
          title={lang.statistics[12]}
          bordered={false}
          className="!mx-4 !w-full"
        >
          <LessonsChart />
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
