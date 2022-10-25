import { CloseCircleFilled, DeleteOutlined } from '@ant-design/icons';
import { message, Popconfirm, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IDiscipline } from '../../models/IDiscipline';
import { IStudent } from '../../models/IStudent';
import {
  deleteDiscipline,
  fetchDisciplines
} from '../../store/reducers/DisciplineActions';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import { LittleRound } from '../Schedule/AddLesson';
import PaidAccess from '../Settings/PaidAccess';
import { Round, StyledTable } from '../Students/Students';
import AddDisciplineForm from './AddDisciplineForm';
import InfoDiscipline from './InfoDiscipline';

const Disciplines = () => {
  const { userId, disciplines, allStudents, loadingDisciplines, lang } =
    useAppSelector((state) => ({
      userId: state.user.data?.id || 0,
      disciplines: state.discipline.data,
      allStudents: state.student.data,
      loadingDisciplines: state.discipline.isLoading,
      lang: state.options.lang
    }));
  const dispatch = useAppDispatch();

  const isMobile = window.screen.width < 768;

  useEffect(() => {
    dispatch(fetchDisciplines(userId));
  }, [userId, dispatch]);

  const columns: ColumnsType<IDiscipline> = [
    {
      title: '',
      dataIndex: 'color',
      align: 'center',
      width: 30,
      render: (color: string) => <Round color={color} />
    },
    {
      title: lang.disciplines[0],
      align: 'center',
      dataIndex: 'title'
    },
    {
      title: lang.disciplines[1],
      align: 'center',
      dataIndex: 'students',
      width: 100,
      render: (students: IStudent[], record: IDiscipline) => {
        if (record.title === 'General') {
          return `${allStudents.filter((item) => !item.break).length} (${
            allStudents.filter((item) => item.break).length
          })`;
        } else {
          return students.length;
        }
      }
    },
    {
      title: lang.disciplines[2],
      align: 'center',
      dataIndex: 'students',
      render: (record: IStudent[]) => (
        <div className="flex flex-col bigPhone:flex-row bigPhone:flex-wrap justify-center items-center">
          {record.map((student) => (
            <div className="flex items-center mx-1 px-1">
              <LittleRound color={student.color} />
              <div>{`${student.name} ${student.surname}`}</div>
            </div>
          ))}
        </div>
      )
    },

    {
      title: lang.disciplines[3],
      align: 'center',
      width: 80,
      render: (record: IDiscipline) => {
        return (
          <>
            {record.title !== 'General' && (
              <>
                <Popconfirm
                  title={lang.disciplines[4]}
                  icon={<CloseCircleFilled style={{ color: 'red' }} />}
                  onConfirm={async () => {
                    try {
                      await isErrorDispatch(
                        dispatch(deleteDiscipline({ id: record.id }))
                      );
                      message.success(lang.disciplines[4]);
                    } catch (err) {
                      PopupError(err);
                    }
                  }}
                  okText={lang.disciplines[6]}
                  cancelText={lang.disciplines[7]}
                >
                  <Tooltip title={lang.disciplines[8]}>
                    <DeleteOutlined
                      style={{
                        fontSize: '20px',
                        color: 'red',
                        marginRight: '.3rem'
                      }}
                    />
                  </Tooltip>
                </Popconfirm>
                <InfoDiscipline discipline={record} allStudents={allStudents} />
              </>
            )}
          </>
        );
      }
    }
  ];

  const general = {
    id: -1,
    color: '#CBD5E1',
    title: 'General',
    students: []
  };
  return (
    <>
      <div className="relative">
        <PaidAccess />

        <div className="flex justify-between mx-4 pt-4 mb-4">
          <div className="flex">
            <AddDisciplineForm />
          </div>
        </div>
        <DisciplineTable>
          <Table
            className="bigPhone:mx-4 ttt"
            columns={
              !isMobile
                ? columns
                : columns.filter((item) => item.title !== lang.disciplines[1])
            }
            dataSource={[
              general,
              ...disciplines.filter((item) => !item?.deletedAt)
            ]}
            loading={loadingDisciplines}
            size={'middle'}
            bordered
            pagination={{ position: ['bottomCenter'] }}
          />
        </DisciplineTable>
      </div>
    </>
  );
};

export default Disciplines;

const DisciplineTable = styled(StyledTable)`
  /* table {
    width: auto;
    min-width: unset !important;
  } */
`;
