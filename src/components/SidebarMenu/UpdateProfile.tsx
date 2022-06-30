import { Button, Space, Avatar, Drawer } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { IUser } from '../../models/IUser';
import * as Yup from 'yup';
import axios from 'axios';
import { PopupError } from '../helpers/PopupError';

interface IUpdateProfile {
  user: IUser | null;
}

interface IFormValues {
  password: string;
  repeatPassword: string;
}

const ValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, 'Too short password')
    .required('Required field'),
  repeatPassword: Yup.string()
    .min(5, 'Too short repeat password')
    .required('Required field')
});

const UpdateProfile = (props: IUpdateProfile) => {
  const { user } = props;
  const [isInfoUser, setIsInfoUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormikProps<IFormValues>>(null);

  const closeModal = () => {
    setIsInfoUser(false);
  };

  const handleSubmit = async (values: IFormValues) => {
    if (values.password !== values.repeatPassword) {
      formRef.current?.setFieldError('password', "Passwords don't match");
      formRef.current?.setFieldError('repeatPassword', "Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`${process.env.REACT_APP_API_URL}/user/setNewPassword`, {
        email: user?.email,
        password: values.password
      });
      setIsInfoUser(false);
      formRef.current?.resetForm();
    } catch (err) {
      PopupError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsInfoUser(true)} className="cursor-pointer">
        Profile
      </div>
      <StyledDrawer
        fullMobileWidth={/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )}
        className=""
        title="Profile Info"
        onClose={closeModal}
        visible={isInfoUser}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeModal}>Cancel</Button>
          </Space>
        }
      >
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
          <Formik
            initialValues={{ password: '', repeatPassword: '' }}
            onSubmit={handleSubmit}
            validationSchema={ValidationSchema}
            innerRef={formRef}
            validateOnBlur
          >
            {({ values, errors }) => (
              <Form className="mt-12 w-full">
                <FormItem name="password">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label
                      htmlFor="password"
                      className="text-gray-500/70 font-bold text-xs"
                    >
                      PASSWORD
                    </label>
                  </div>

                  <Input.Password
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                </FormItem>

                <FormItem name="repeatPassword">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label
                      htmlFor="password"
                      className="text-gray-500/70 font-bold text-xs"
                    >
                      REPEAT PASSWORD
                    </label>
                  </div>

                  <Input.Password
                    name="repeatPassword"
                    placeholder="Repeat password"
                    type="password"
                  />
                </FormItem>

                <SubmitButton
                  key="submit"
                  className="w-full rounded-sm"
                  loading={loading}
                  disabled={
                    !values.password ||
                    !values.repeatPassword ||
                    !!errors.password
                  }
                >
                  Update password
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </>
      </StyledDrawer>
    </>
  );
};

export default UpdateProfile;

const StyledDrawer = styled(Drawer)<{ fullMobileWidth?: boolean }>`
  .ant-drawer-content-wrapper {
    width: ${(props) => props.fullMobileWidth && '100% !important'};
  }
`;
