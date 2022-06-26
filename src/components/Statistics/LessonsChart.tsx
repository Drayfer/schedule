import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { useAppSelector } from '../../hooks/redux';
import axios from 'axios';
import { PopupError } from '../helpers/PopupError';
import { Spin } from 'antd';

type Props = {};

interface IChart {
  lessons: number;
  date: string;
}

const LessonsChart = (props: Props) => {
  const { userId } = useAppSelector((state) => ({
    userId: state.user.data?.id
  }));

  const [chardData, setChartData] = useState<IChart[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      try {
        setLoading(true);
        axios
          .get<IChart[]>(
            `${process.env.REACT_APP_API_URL}/option/statistic/chart/${userId}`
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
    tooltip: {
      showMarkers: false
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red'
        }
      }
    },
    interactions: [
      {
        type: 'marker-active'
      }
    ]
  };
  return loading ? (
    <div className="flex justify-center">
      <Spin />
    </div>
  ) : (
    <Line {...config} />
  );
};

export default LessonsChart;
