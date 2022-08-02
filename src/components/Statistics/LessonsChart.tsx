import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { useAppSelector } from '../../hooks/redux';
import axios from 'axios';
import { PopupError } from '../helpers/PopupError';
import { Spin } from 'antd';
import { getTokenHeader } from '../helpers/getTokenHeader';
import moment from 'moment';

interface IChart {
  lessons: number;
  date: string;
}

const LessonsChart = () => {
  const { userId, currency } = useAppSelector((state) => ({
    userId: state.user.data?.id,
    currency: state.options.data?.currency
  }));

  const [chardData, setChartData] = useState<IChart[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      try {
        setLoading(true);
        axios
          .get<IChart[]>(
            `${process.env.REACT_APP_API_URL}/option/statistic/chart/${userId}`,
            getTokenHeader()
          )
          .then((result) => {
            setChartData(result.data);
            setLoading(false);
          });
      } catch (err) {
        PopupError(err);
        setLoading(false);
      }
    }
    // eslint-disable-next-line
  }, [userId]);

  const config = {
    data: chardData,
    xField: 'date',
    yField: 'lessons',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2
      }
    },
    // tooltip: {
    //   showMarkers: false
    // },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red'
        }
      }
    },
    tooltip: {
      showMarkers: true,
      customContent: (title: string, data: any[]): string | HTMLElement => {
        return (
          <div>
            <p className="pt-2">
              {title} -{' '}
              {moment(title, 'DD.MM.YYYY').add(6, 'days').format('DD.MM.YYYY')}
            </p>
            {data.map((t) => (
              <div key={title}>
                <p>
                  Lessons: <b>{t.data.lessons}</b>
                </p>
                <p>
                  Income:{' '}
                  <b>
                    {t.data.weekIncome} {currency}
                  </b>
                </p>
                <p>
                  Added Students:{' '}
                  <b>
                    {t.data.weekStudents
                      ?.map((st: string) => {
                        const student = st.trim().split('::');
                        return `${student[0]} (${moment(student[1]).format(
                          'DD.MM.YYYY'
                        )})`;
                      })
                      .join(', ') || '-'}
                  </b>
                </p>
              </div>
            ))}
          </div>
        ) as unknown as HTMLElement;
      }
    },
    interactions: [
      {
        type: 'marker-active'
      }
    ],
    slider: {
      start: 0,
      end: 1
    }
  };
  return loading ? (
    <div className="flex justify-center">
      <Spin />
    </div>
  ) : (
    <Column {...config} />
  );
};

export default LessonsChart;
