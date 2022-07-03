import {
  ClearOutlined,
  CloseCircleFilled,
  CopyOutlined
} from '@ant-design/icons';
import { Popconfirm, Tooltip } from 'antd';
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
    <div className="absolute top-12 left-2 flex flex-col z-10 bigPhone:top-1 bigPhone:right-2 bigPhone:flex-row">
      {weekStart && weekStart < moment().startOf('isoWeek').add(3, 'week') && (
        <Popconfirm
          title="Are you sure you want to copy the previous week?"
          icon={<CloseCircleFilled style={{ color: 'red' }} />}
          onConfirm={async () => {
            try {
              userId &&
                (await isErrorDispatch(
                  dispatch(
                    copyLessonsWeek({
                      userId,
                      dateStart: moment(weekStart).subtract(1, 'week').toDate()
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
          <Tooltip placement="right" title="сopy previous week">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer mr-1 mb-1">
              <CopyOutlined />
            </div>
          </Tooltip>
        </Popconfirm>
      )}
      <Popconfirm
        title="Are you sure you want to clear the schedule?"
        icon={<CloseCircleFilled style={{ color: 'red' }} />}
        onConfirm={async () => {
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
        okText="Yes"
        cancelText="No"
      >
        <Tooltip placement="right" title="clear week">
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer">
            <ClearOutlined />
          </div>
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export default CornerButtons;
