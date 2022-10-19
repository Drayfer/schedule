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
  Dropdown,
  Input,
  Menu,
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
  MoreOutlined,
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
import { ColumnsType } from 'antd/lib/table';

type Props = {};

const Students = (props: Props) => {
  const {
    userId,
    students,
    loadingStudents,
    searchedStudentId,
    allDisciplines,
    lang
  } = useAppSelector((state) => ({
    userId: state.user.data?.id || 0,
    students: state.student.data,
    loadingStudents: state.student.isLoading,
    searchedStudentId: state.options.searchedStudentId,
    allDisciplines: state.discipline.data,
    lang: state.options.lang
  }));

  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();

  const isMobile = window.screen.width < 768;

  useEffect(() => {
    dispatch(fetchStudents(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    if (searchedStudentId && students) {
      const search = students.filter((item) => item.id === searchedStudentId);
      setFilteredStudents(search);
    } else {
      setFilteredStudents(
        students?.filter((item) => (isActive ? !item.break : item.break))
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

  const actionButtons = (record: IStudent) => {
    return (
      <>
        <Popconfirm
          title={lang.students[5]}
          icon={<CloseCircleFilled style={{ color: 'red' }} />}
          onConfirm={async () => {
            try {
              await isErrorDispatch(dispatch(deleteStudent({ id: record.id })));
              await isErrorDispatch(
                dispatch(
                  deleteSomeLesson({
                    studentId: record.id
                  })
                )
              );
              message.success(lang.students[6]);
            } catch (err) {
              PopupError(err);
            }
          }}
          okText={lang.students[7]}
          cancelText={lang.students[8]}
        >
          <Tooltip title={lang.students[9]}>
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
          title={isActive ? lang.students[10] : lang.students[66]}
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
                `${lang.students[11]} ${
                  isActive ? lang.students[12] : lang.students[13]
                }. ${lang.students[14]}`
              );
            } catch (err) {
              PopupError(err);
            }
          }}
          okText={lang.students[7]}
          cancelText={lang.students[8]}
        >
          <Tooltip title={isActive ? lang.students[15] : lang.students[65]}>
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
  };

  const columns: ColumnsType<IStudent> = [
    {
      title: '',
      align: 'center',
      dataIndex: 'color',
      width: 30,
      render: (color: string) => <Round color={color} />
    },
    {
      title: lang.students[0],
      align: 'center',
      dataIndex: 'name',
      render: (name: string, record: IStudent) => (
        <div className="flex flex-col justify-center min-h-7">
          <div>{`${name} ${record.surname}`}</div>
          {record?.disciplines?.length ? (
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
      title: lang.students[1],
      dataIndex: 'balance',
      align: 'center',
      // width: 100,
      sorter: (a: IStudent, b: IStudent) => a.balance - b.balance,
      render: (count: number, record: IStudent) => {
        return (
          <>
            <Col span={24}>
              {record.showBalance && (
                <Row className="flex justify-between items-center flex-nowrap w-[90px] mx-auto">
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
                    <div className="text-lime-600 font-semibold text-md mx-1">
                      {count}
                    </div>
                  ) : (
                    <div className="text-red-600 font-semibold text-md mx-1">
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
            <Col span={24}>
              <Tooltip title={lang.students[2]}>
                <Switch
                  size="small"
                  checkedChildren={lang.students[7].toLowerCase()}
                  unCheckedChildren={lang.students[8].toLowerCase()}
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
          </>
        );
      }
    },
    {
      title: lang.students[3],
      dataIndex: 'createdDate',
      align: 'center',
      render: (date: Date) => moment.utc(date).local().format('DD.MM.YY'),
      sorter: (a: IStudent, b: IStudent) =>
        moment(b.createdDate).unix() - moment(a.createdDate).unix()
    },
    {
      title: lang.students[4],
      align: 'center',
      width: 100,
      render: (record: IStudent) => (
        <div className="flex justify-between">{actionButtons(record)}</div>
      )
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
              placeholder={lang.students[16]}
              onChange={(e) => handleSearchChange(e)}
              value={searchValue}
            />
            <div className="hidden bigPhone:block">
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
                {lang.students[17]}
              </Button>
            </div>
          </div>

          <Tooltip title={isActive ? lang.students[18] : lang.students[19]}>
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
              {isActive ? lang.students[20] : lang.students[21]}
            </Button>
          </Tooltip>
        </div>
      )}
      <StyledTable>
        <Table
          className="bigPhone:mx-4 ttt"
          columns={
            !isMobile
              ? columns
              : columns.filter((item) => item.title !== lang.students[3])
          }
          dataSource={filteredStudents}
          loading={loadingStudents}
          size={'middle'}
          bordered
          pagination={
            !searchedStudentId && {
              position: ['bottomCenter'],
              defaultPageSize: 15
            }
          }
        />
      </StyledTable>
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
          {lang.students[22]}
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
  /* margin: 0 5px; */
`;

const DotColor = styled(Round)`
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 3px;
`;

const StyledTable = styled.div`
  .ttt tr:nth-child(2n) td {
    background-color: #f7fdff;
  }
  .ttt thead {
    background-color: #f1f1f1;
  }
`;
