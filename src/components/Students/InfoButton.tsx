import { InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Drawer, Row, Space, Tooltip } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
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

  const [isInfoStudent, setIsInfoStudent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const closeModal = () => {
    setIsEdit(false);
    setIsInfoStudent(false);
  };

  return (
    <>
      <Tooltip title="student info">
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
        title="Student Info"
        // width={390}
        onClose={closeModal}
        visible={isInfoStudent}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeModal}>Cancel</Button>
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
              <NameCol>Balance:</NameCol>
              <ValueCol>{student.balance}</ValueCol>
              <NameCol>Active:</NameCol>
              <ValueCol>{student.break ? 'No' : 'Yes'}</ValueCol>
              <NameCol>Disciplines:</NameCol>
              <ValueCol>
                <div className="flex items-center">
                  <LittleRound color="#CBD5E1" />
                  General
                </div>
                {student.disciplines?.map((item) => (
                  <div className="flex items-center">
                    <LittleRound color={item.color} />
                    {item.title}
                  </div>
                ))}
              </ValueCol>
              <NameCol>Birthday:</NameCol>
              <ValueCol>
                {student.birthday &&
                  moment(student.birthday).format('DD.MM.YYYY')}
              </ValueCol>
              <NameCol>Parent:</NameCol>
              <ValueCol>{student.parent}</ValueCol>
              <NameCol>Pnone:</NameCol>
              <ValueCol>{student.phone}</ValueCol>
              <NameCol>Email:</NameCol>
              <ValueCol>{student.email}</ValueCol>
              <NameCol>Skype:</NameCol>
              <ValueCol>{student.skype}</ValueCol>
              <NameCol>Note:</NameCol>
              <Col span={24}>{student.note}</Col>
            </Row>
            <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
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
