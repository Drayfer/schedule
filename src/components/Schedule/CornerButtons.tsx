import { ClearOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  copyLessonsWeek,
  deleteLessonsWeek
} from '../../store/reducers/LessonActions';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';

interface CornerButtonsProps {
  currentDate: moment.Moment | null;
}

const CornerButtons = (props: CornerButtonsProps) => {
  const { currentDate } = props;
  const { userId } = useAppSelector((state) => ({
    userId: state.user.data?.id
  }));

  const weekStart = currentDate?.clone().startOf('isoWeek') || moment();

  const dispatch = useAppDispatch();

  return (
    <div className="absolute top-1 right-2">
      {weekStart && weekStart < moment().startOf('isoWeek').add(3, 'week') && (
        <Tooltip title="сopy last week">
          <Button
            shape="round"
            onClick={async () => {
              try {
                userId &&
                  (await isErrorDispatch(
                    dispatch(
                      copyLessonsWeek({
                        userId,
                        dateStart: moment(weekStart)
                          .subtract(1, 'week')
                          .toDate()
                      })
                    )
                  ));
              } catch (err) {
                PopupError(err);
              }
            }}
          >
            <CopyOutlined />
          </Button>
        </Tooltip>
      )}
      <Tooltip title="clear week">
        <Button
          shape="round"
          onClick={async () => {
            try {
              userId &&
                (await isErrorDispatch(
                  dispatch(
                    deleteLessonsWeek({
                      userId,
                      dateStart: moment(weekStart).toDate()
                    })
                  )
                ));
            } catch (err) {
              PopupError(err);
            }
          }}
        >
          <ClearOutlined />
        </Button>
      </Tooltip>
    </div>
  );
};

export default CornerButtons;
