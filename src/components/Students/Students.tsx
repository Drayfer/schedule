import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  deleteStudent,
  fetchStudents,
  updateStudent
} from '../../store/reducers/StudentActions';
import { IStudent } from '../../models/IStudent';
import {
  Button,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Switch,
  Table,
  Tooltip
} from 'antd';
import styled from 'styled-components';
import {
  CloseCircleFilled,
  DeleteOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SwapLeftOutlined
} from '@ant-design/icons';
import moment from 'moment';
import AddStudentForm from './AddStudentForm';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import InfoButton from './InfoButton';
import { deleteSomeLesson } from '../../store/reducers/LessonActions';
import {
  setActiveBoard,
  setSearchedStudent
} from '../../store/reducers/OptionsSlice';

type Props = {};

const Students = (props: Props) => {
  const {
    userId,
    students,
    loadingStudents,
    searchedStudentId,
    allDisciplines
  } = useAppSelector((state) => ({
    userId: state.user.data?.id || 0,
    students: state.student.data,
    loadingStudents: state.student.isLoading,
    searchedStudentId: state.options.searchedStudentId,
    allDisciplines: state.discipline.data
  }));

  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStudents(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (searchedStudentId && students) {
      const search = students.filter((item) => item.id === searchedStudentId);
      setFilteredStudents(search);
    } else {
      setFilteredStudents(
        students.filter((item) => (isActive ? !item.break : item.break))
      );
    }
  }, [students, isActive, searchedStudentId, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchValue(e.target.value);
    if (searchValue) {
      const searchedStudents = students.filter(
        (item) =>
          (isActive ? !item.break : item.break) &&
          (item.name.toLowerCase().includes(query) ||
            item.surname.toLowerCase().includes(query))
      );
      setFilteredStudents(searchedStudents);
    } else {
      setFilteredStudents(
        students.filter((item) => (isActive ? !item.break : item.break))
      );
    }
  };

  const columns = [
    {
      title: '',
      dataIndex: 'color',
      width: 30,
      render: (color: string) => <Round color={color} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, record: IStudent) => (
        <div className="flex flex-col justify-center min-h-7">
          <div>{`${name} ${record.surname}`}</div>
          {record.disciplines.length ? (
            <div className="text-[2px]">
              {record.disciplines.map((item) => (
                <Tooltip title={item.title}>
                  <DotColor color={item.color} />
                </Tooltip>
              ))}
            </div>
          ) : null}
        </div>
      ),
      sorter: (a: IStudent, b: IStudent) =>
        b.name.toString().localeCompare(a.name.toString())
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      sorter: (a: IStudent, b: IStudent) => a.balance - b.balance,
      render: (count: number, record: IStudent) => {
        return (
          <Row className="flex items-center justify-around">
            <Col span={12}>
              {record.showBalance && (
                <Row>
                  <CountButton
                    shape="circle"
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={async () =>
                      dispatch(
                        updateStudent({
                          studentId: record.id,
                          balance: -1
                        })
                      )
                    }
                  ></CountButton>

                  {count > 0 ? (
                    <div className="text-lime-600 font-semibold text-lg">
                      {count}
                    </div>
                  ) : (
                    <div className="text-red-600 font-semibold text-lg">
                      {count}
                    </div>
                  )}
                  <CountButton
                    shape="circle"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={async () =>
                      dispatch(
                        updateStudent({
                          studentId: record.id,
                          balance: 1
                        })
                      )
                    }
                  ></CountButton>
                </Row>
              )}
            </Col>
            <Col span={12}>
              <Tooltip title="show/hide balance">
                <Switch
                  size="small"
                  checked={record.showBalance}
                  onChange={async () =>
                    dispatch(
                      updateStudent({
                        studentId: record.id,
                        showBalance: !record.showBalance
                      })
                    )
                  }
                />
              </Tooltip>
            </Col>
          </Row>
        );
      }
    },
    {
      title: 'Added',

      dataIndex: 'createdDate',
      render: (date: Date) => moment(date).format('DD.MM.YYYY'),
      sorter: (a: IStudent, b: IStudent) =>
        moment(b.createdDate).unix() - moment(a.createdDate).unix()
    },
    {
      title: 'Actions',
      render: (record: IStudent) => {
        return (
          <>
            <Popconfirm
              title="Are you sure to delete this student? All scheduled lessons in the timetable will be deleted."
              icon={<CloseCircleFilled style={{ color: 'red' }} />}
              onConfirm={async () => {
                try {
                  await isErrorDispatch(
                    dispatch(deleteStudent({ id: record.id }))
                  );
                  await isErrorDispatch(
                    dispatch(
                      deleteSomeLesson({
                        studentId: record.id
                      })
                    )
                  );
                  message.success(
                    'Student deleted successfully. All scheduled lessons deleted successfully.'
                  );
                } catch (err) {
                  PopupError(err);
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="delete student">
                <DeleteOutlined
                  style={{
                    fontSize: '20px',
                    color: 'red',
                    marginRight: '.3rem'
                  }}
                />
              </Tooltip>
            </Popconfirm>

            <Popconfirm
              title="Are you sure to send this student to rest? All scheduled lessons in the timetable will be deleted."
              onConfirm={async () => {
                try {
                  await isErrorDispatch(
                    dispatch(
                      updateStudent({
                        studentId: record.id,
                        break: !record.break
                      })
                    )
                  );
                  if (isActive) {
                    await isErrorDispatch(
                      dispatch(
                        deleteSomeLesson({
                          studentId: record.id
                        })
                      )
                    );
                  }
                  message.info(
                    `Student is ${
                      isActive ? 'hidden' : 'active'
                    }. All scheduled lessons deleted successfully.`
                  );
                } catch (err) {
                  PopupError(err);
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="send to rest">
                {isActive ? (
                  <MinusCircleOutlined
                    style={{
                      fontSize: '20px',
                      color: '#eda600',
                      marginRight: '.3rem'
                    }}
                  />
                ) : (
                  <PlusCircleOutlined
                    style={{
                      fontSize: '20px',
                      color: '#2ae400',
                      marginRight: '.3rem'
                    }}
                  />
                )}
              </Tooltip>
            </Popconfirm>

            <InfoButton student={record} allDisciplines={allDisciplines} />
          </>
        );
      }
    }
  ];

  return (
    <>
      {!searchedStudentId && (
        <div className="flex justify-between m-4">
          <div className="flex">
            <AddStudentForm />
            <Input
              width={150}
              placeholder="Search student"
              onChange={(e) => handleSearchChange(e)}
              value={searchValue}
            />
            <Button
              onClick={() => {
                setSearchValue('');
                setFilteredStudents(
                  students.filter((item) =>
                    isActive ? !item.break : item.break
                  )
                );
              }}
            >
              Clear
            </Button>
          </div>

          <Tooltip
            title={isActive ? 'Show hidden students' : 'Show active students'}
          >
            <Button
              type="default"
              onClick={() => {
                setFilteredStudents(
                  students.filter((item) =>
                    isActive ? item.break : !item.break
                  )
                );
                setIsActive(!isActive);
              }}
            >
              {isActive ? 'Active' : 'Hidden'}
            </Button>
          </Tooltip>
        </div>
      )}

      <Table
        className="ml-4 mr-4"
        columns={columns}
        dataSource={filteredStudents}
        loading={loadingStudents}
        size={'small'}
        pagination={!searchedStudentId && { position: ['bottomCenter'] }}
      />
      {searchedStudentId && (
        <Button
          icon={<SwapLeftOutlined />}
          type="primary"
          className="ml-4 mt-2"
          onClick={() => {
            dispatch(setActiveBoard('schedule'));
            dispatch(setSearchedStudent(null));
          }}
        >
          Back to Schedule
        </Button>
      )}
    </>
  );
};

export default Students;

export const Round = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const CountButton = styled(Button)`
  margin: 0 5px;
`;

const DotColor = styled(Round)`
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 3px;
`;
