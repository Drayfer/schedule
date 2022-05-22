import { ClearOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import {
  copyLessonsWeek,
  deleteLessonsWeek
} from '../../store/reducers/LessonActions';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';

interface CornerButtonsProps {
  weekStart: moment.Moment | undefined;
  userId: number | undefined;
}

const CornerButtons = (props: CornerButtonsProps) => {
  const { weekStart, userId } = props;

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
