import { InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Row, Space, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';
import { IDiscipline } from '../../models/IDiscipline';
import { IStudent } from '../../models/IStudent';
import { LittleRound } from '../Schedule/AddLesson';
import UpdateStudentForm from './UpdateStudentForm';

interface InfoButtonProps {
  student: IStudent;
  allDisciplines: IDiscipline[];
}

const InfoButton = (props: InfoButtonProps) => {
  const { student, allDisciplines } = props;
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang
  }));

  const [isInfoStudent, setIsInfoStudent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const closeModal = () => {
    setIsEdit(false);
    setIsInfoStudent(false);
  };

  return (
    <>
      <Tooltip title={lang.students[33]}>
        <InfoCircleOutlined
          style={{
            fontSize: '20px',
            color: '#2884ca'
          }}
          onClick={() => setIsInfoStudent(true)}
        />
      </Tooltip>
      <StyledDrawer
        fullMobileWidth={/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )}
        className=""
        title={lang.students[34]}
        // width={390}
        onClose={closeModal}
        visible={isInfoStudent}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeModal}>{lang.students[35]}</Button>
          </Space>
        }
      >
        {isEdit ? (
          <UpdateStudentForm
            student={student}
            setIsEdit={setIsEdit}
            allDisciplines={allDisciplines}
          />
        ) : (
          <>
            <Avatar
              style={{
                backgroundColor: `${student.color}`,
                verticalAlign: 'middle',
                margin: '10px',
                width: '50px',
                height: '50px',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '20px'
              }}
              size="large"
            >
              {student.name.slice(0, 1)}
            </Avatar>
            <span className="font-bold text-lg">
              {student.name} {student.surname}
            </span>
            <Row className="my-3">
              <NameCol>{lang.students[3]}:</NameCol>
              <ValueCol>
                {moment.utc(student.createdDate).local().format('DD.MM.YYYY')}
              </ValueCol>
              <NameCol>{lang.students[36]}:</NameCol>
              <ValueCol>{student.balance}</ValueCol>
              <NameCol>{lang.students[37]}:</NameCol>
              <ValueCol>
                {student.break ? lang.students[38] : lang.students[39]}
              </ValueCol>
              <NameCol>{lang.students[40]}:</NameCol>
              <ValueCol>
                <div className="flex items-center">
                  <LittleRound color="#CBD5E1" />
                  {lang.students[41]}
                </div>
                {student.disciplines?.map((item) => (
                  <div className="flex items-center">
                    <LittleRound color={item.color} />
                    {item.title}
                  </div>
                ))}
              </ValueCol>
              <NameCol>{lang.students[42]}:</NameCol>
              <ValueCol>
                {student.birthday &&
                  moment(student.birthday).format('DD.MM.YYYY')}
              </ValueCol>
              <NameCol>{lang.students[43]}:</NameCol>
              <ValueCol>{student.parent}</ValueCol>
              <NameCol>{lang.students[44]}:</NameCol>
              <ValueCol>{student.phone}</ValueCol>
              <NameCol>{lang.students[45]}:</NameCol>
              <ValueCol>{student.email}</ValueCol>
              <NameCol>{lang.students[46]}:</NameCol>
              <ValueCol>{student.skype}</ValueCol>
              <NameCol>{lang.students[47]}:</NameCol>
              <Col span={24}>{student.note}</Col>
            </Row>
            <Button onClick={() => setIsEdit(!isEdit)}>
              {lang.students[48]}
            </Button>
          </>
        )}
      </StyledDrawer>
    </>
  );
};

export default InfoButton;

const NameCol = styled(Col)`
  width: 30%;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ValueCol = styled(Col)`
  width: 70%;
`;

const StyledDrawer = styled(Drawer)<{ fullMobileWidth?: boolean }>`
  .ant-drawer-content-wrapper {
    width: ${(props) => props.fullMobileWidth && '100% !important'};
  }
`;
