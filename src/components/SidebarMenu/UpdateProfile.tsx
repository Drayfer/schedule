import { Button, Space, Avatar, Drawer } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IUser } from '../../models/IUser';

interface IUpdateProfile {
  user: IUser | null;
}

const UpdateProfile = (props: IUpdateProfile) => {
  const { user } = props;
  const [isInfoStudent, setIsInfoStudent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const closeModal = () => {
    setIsEdit(false);
    setIsInfoStudent(false);
  };

  return (
    <>
      <div onClick={() => setIsInfoStudent(true)}>Profile</div>
      <StyledDrawer
        fullMobileWidth={/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )}
        className=""
        title="Profile Info"
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
          //   <UpdateStudentForm student={student} setIsEdit={setIsEdit} />dsdsds
          <p>wewew</p>
        ) : (
          <>
            <Avatar
              style={{
                backgroundColor: '#e08b45',
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
              {/* {student.name.slice(0, 1)} */}
              {user?.name.slice(0, 1)}
            </Avatar>
            <span className="font-bold text-lg">{user?.name}</span>
            {/*  <Row className="my-3">
              <NameCol>Balance:</NameCol>
              <ValueCol>{student.balance}</ValueCol>
              <NameCol>Active:</NameCol>
              <ValueCol>{student.break ? 'No' : 'Yes'}</ValueCol>
              <NameCol>Age:</NameCol>
              <ValueCol>{student.age}</ValueCol>
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
            </Row> */}
            <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
          </>
        )}
      </StyledDrawer>
    </>
  );
};

export default UpdateProfile;

// const NameCol = styled(Col)`
//   width: 30%;
//   font-weight: 600;
//   margin-bottom: 5px;
// `;

// const ValueCol = styled(Col)`
//   width: 70%;
// `;

const StyledDrawer = styled(Drawer)<{ fullMobileWidth?: boolean }>`
  .ant-drawer-content-wrapper {
    width: ${(props) => props.fullMobileWidth && '100% !important'};
  }
`;
