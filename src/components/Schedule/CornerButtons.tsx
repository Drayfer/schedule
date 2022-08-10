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
  const { userId, lang } = useAppSelector((state) => ({
    userId: state.user.data?.id,
    lang: state.options.lang
  }));

  const weekStart = currentDate?.clone().startOf('isoWeek') || moment();

  const dispatch = useAppDispatch();

  return (
    <div className="absolute top-1 left-2 flex z-50">
      {weekStart && weekStart < moment().startOf('isoWeek').add(3, 'week') && (
        <Popconfirm
          title={lang.schedule[13]}
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
          okText={lang.schedule[5]}
          cancelText={lang.schedule[6]}
        >
          <Tooltip placement="right" title={lang.schedule[22]}>
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer mr-1 mb-1 border-slate-600 border-[1px]">
              <CopyOutlined />
            </div>
          </Tooltip>
        </Popconfirm>
      )}
      <Popconfirm
        title={lang.schedule[14]}
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
        okText={lang.schedule[5]}
        cancelText={lang.schedule[6]}
      >
        <Tooltip placement="right" title={lang.schedule[21]}>
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-white cursor-pointer border-slate-600 border-[1px]">
            <ClearOutlined />
          </div>
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export default CornerButtons;
