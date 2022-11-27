import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateStudent } from '../../store/reducers/StudentActions';
import { IStudent } from '../../models/IStudent';
import { Button, Modal, Row, Table } from 'antd';
import {
  CaretRightOutlined,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons';
import moment from 'moment';
import { ColumnsType } from 'antd/lib/table';
import { StyledTable } from './Students';
import axios from 'axios';
import { getTokenHeader } from '../helpers/getTokenHeader';

type IBalanceHistory = {
  student: IStudent;
};

export interface IHistory {
  date: Date;
  count: number;
  action: string;
}

const BalanceHistory = (props: IBalanceHistory) => {
  const { student } = props;
  const { searchedStudentId, lang } = useAppSelector((state) => ({
    searchedStudentId: state.options.searchedStudentId,
    lang: state.options.lang.students
  }));

  const dispatch = useAppDispatch();

  const [isModal, setIsModal] = useState(false);
  const [newBalance, setNewBalance] = useState(0);
  const [isLoadConfirm, setIsLoadConfirm] = useState(false);
  const [history, setHistory] = useState<IHistory[]>([]);

  const columns: ColumnsType<IHistory> = [
    {
      title: lang[72],
      align: 'center',
      dataIndex: 'date',
      render: (date: Date) =>
        moment.utc(date).local().format('DD.MM.YY, HH:mm'),
      sorter: (a: IHistory, b: IHistory) =>
        moment(b.date).unix() - moment(a.date).unix()
    },
    {
      title: lang[73],
      align: 'center',
      dataIndex: 'action',
      sorter: (a: IHistory, b: IHistory) => b.action.localeCompare(a.action),
      render: (action: string) => action
    },
    {
      title: lang[74],
      align: 'center',
      dataIndex: 'count',
      render: (count: number) => count,
      sorter: (a: IHistory, b: IHistory) => a.count - b.count
    }
  ];

  const handleConfirm = () => {
    setIsLoadConfirm(true);
    dispatch(
      updateStudent({
        studentId: student.id,
        balance: newBalance,
        updateBalanceHistory: true
      })
    )
      .then(() => setNewBalance(0))
      .finally(() => setIsLoadConfirm(false));
  };

  const handleCloseModal = () => {
    setIsModal(false);
    setNewBalance(0);
  };

  const getBalanceHistory = async (id: number) => {
    const response = await axios.get<IHistory[]>(
      `${process.env.REACT_APP_API_URL}/student/balanceHistory/${id}`,
      getTokenHeader()
    );
    return response.data;
  };

  useEffect(() => {
    if (student.id && isModal && newBalance === 0) {
      getBalanceHistory(student.id).then((data) =>
        setHistory(
          data.map((item) => ({
            ...item,
            action:
              item.action === 'add'
                ? lang[76]
                : item.action === 'subtract'
                ? lang[77]
                : lang[78]
          }))
        )
      );
    }
  }, [student.id, isModal, newBalance, lang]);

  return (
    <>
      <Button
        // type="primary"
        size="small"
        onClick={() => setIsModal(true)}
        className="w-16 relative"
      >
        <div
          className={`text-${
            student.balance > 0 ? 'green' : 'red'
          }-600 font-semibold text-md`}
        >
          {student.balance}
        </div>

        <CaretRightOutlined
          className="absolute right-0 top-1"
          style={{ fontSize: '12px', color: '#08c' }}
        />
      </Button>
      <Modal
        title={`${student.name} ${student.surname} - ${lang[55]}`}
        visible={isModal}
        onCancel={handleCloseModal}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={lang[75]}
      >
        <Row className="flex justify-between items-center flex-nowrap">
          <div>{lang[67]}:</div>
          <div className="flex">
            <Button
              shape="circle"
              size="small"
              icon={<MinusOutlined />}
              onClick={() => setNewBalance(newBalance - 1)}
            ></Button>

            <div
              className={`text-${
                newBalance > 0 ? 'green' : 'red'
              }-600 font-semibold text-md mx-3`}
            >
              {newBalance}
            </div>

            <Button
              shape="circle"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => setNewBalance(newBalance + 1)}
            ></Button>
          </div>
          <Button
            type="primary"
            onClick={handleConfirm}
            loading={isLoadConfirm}
            disabled={newBalance === 0}
          >
            {lang[68]}
          </Button>
        </Row>
        <div className="flex space-x-2">
          <div className="w-auto">{lang[69]}:</div>
          <div
            className={`w-fit text-${
              student.balance > 0 ? 'green' : 'red'
            }-600 font-semibold text-md`}
          >
            {student.balance}
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="w-auto">{lang[70]}:</div>
          <div className={`w-fit`}>
            {history.reduce((ac, el) => {
              if (el.action === lang[78]) {
                ac += 1;
              }
              return ac;
            }, 0)}
          </div>
        </div>

        <div className="mx-auto font-bold text-center mt-2">{lang[71]}</div>
        <StyledTable>
          <Table
            className="ttt"
            columns={columns}
            dataSource={history}
            size={'small'}
            bordered
            pagination={
              !searchedStudentId && {
                position: ['bottomCenter'],
                defaultPageSize: 15
              }
            }
          />
        </StyledTable>
      </Modal>
    </>
  );
};

export default BalanceHistory;
