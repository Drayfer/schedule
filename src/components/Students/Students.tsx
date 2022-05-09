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
  PlusOutlined
} from '@ant-design/icons';
import moment from 'moment';
import AddStudentForm from './AddStudentForm';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import InfoButton from './InfoButton';

type Props = {};

const Students = (props: Props) => {
  const { userId, students, loadingStudents } = useAppSelector((state) => ({
    userId: state.user.data?.id || 0,
    students: state.student.data,
    loadingStudents: state.student.isLoading
  }));

  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [isActive, setIsActive] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStudents(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    setFilteredStudents(
      students.filter((item) => (isActive ? !item.break : item.break))
    );
  }, [students, isActive]);

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
      render: (name: string, record: IStudent) => `${name} ${record.surname}`,
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
                          balance: record.balance - 1
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
                          balance: record.balance + 1
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
              title="Are you sure to delete this student?"
              icon={<CloseCircleFilled style={{ color: 'red' }} />}
              onConfirm={async () => {
                try {
                  await isErrorDispatch(
                    dispatch(deleteStudent({ id: record.id }))
                  );
                  message.success('Student deleted successfully.');
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
              title="Are you sure to send this student to rest?"
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
                  message.info(`Student is ${isActive ? 'hidden' : 'active'}.`);
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

            <InfoButton student={record} />
          </>
        );
      }
    }
  ];

  return (
    <>
      <div className="flex justify-between m-4">
        <AddStudentForm />
        <Tooltip
          title={isActive ? 'show hidden students' : 'show active students'}
        >
          <Button
            type="default"
            onClick={() => {
              setFilteredStudents(
                students.filter((item) => (isActive ? item.break : !item.break))
              );
              setIsActive(!isActive);
            }}
          >
            {isActive ? 'Active' : 'Hidden'}
          </Button>
        </Tooltip>
      </div>

      <Table
        className="ml-4 mr-4"
        columns={columns}
        dataSource={filteredStudents}
        loading={loadingStudents}
        size={'small'}
        pagination={{ position: ['bottomCenter'] }}
      />
    </>
  );
};

export default Students;

const Round = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const CountButton = styled(Button)`
  margin: 0 5px;
`;
