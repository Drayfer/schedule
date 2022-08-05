import { Button, Space, Avatar, Drawer, message } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import { updateProfile } from '../../store/reducers/UserActions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface IFormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const ValidationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short name').required('Required field'),
  email: Yup.string().email('Enter valid email').required('Required field'),
  password: Yup.string()
    .min(5, 'Too short password')
    .required('Required field'),
  repeatPassword: Yup.string()
    .min(5, 'Too short repeat password')
    .required('Required field')
});

const UpdateProfile = () => {
  const { user } = useAppSelector((state) => ({
    user: state.user.data
  }));
  const [isInfoUser, setIsInfoUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormikProps<IFormValues>>(null);
  const dispatch = useAppDispatch();

  let initialValues = {
    password: '',
    repeatPassword: '',
    name: user?.name || '',
    email: user?.email || ''
  };

  const closeModal = () => {
    setIsInfoUser(false);
  };

  const handleSubmit = async (values: IFormValues) => {
    if (values.password !== values.repeatPassword) {
      formRef.current?.setFieldError('password', "Passwords don't match");
      formRef.current?.setFieldError('repeatPassword', "Passwords don't match");
      return;
    }
    if (user?.id) {
      try {
        setLoading(true);
        await isErrorDispatch(
          dispatch(
            updateProfile({
              name: values.name,
              email: values.email,
              password: values.password,
              id: user.id
            })
          )
        );
        message.success('Profile updated successfully.');
        setIsInfoUser(false);
        formRef.current?.resetForm();
      } catch (err) {
        PopupError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div onClick={() => setIsInfoUser(true)} className="cursor-pointer">
        Profile
      </div>
      {isInfoUser && (
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
              {user?.name.slice(0, 1)}
            </Avatar>
            <span className="font-bold text-lg">{user?.name}</span>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={ValidationSchema}
              innerRef={formRef}
              validateOnBlur
            >
              {({ values, errors }) => (
                <Form className="mt-12 w-full">
                  <FormItem name="name">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label
                        htmlFor="name"
                        className="text-gray-500/70 font-bold text-xs"
                      >
                        NAME
                      </label>
                    </div>

                    <Input name="name" placeholder="Name" type="text" />
                  </FormItem>

                  <FormItem name="email">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label
                        htmlFor="email"
                        className="text-gray-500/70 font-bold text-xs"
                      >
                        EMAIL
                      </label>
                    </div>

                    <Input name="email" placeholder="Email" type="email" />
                  </FormItem>

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
                  >
                    Update profile
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </>
        </StyledDrawer>
      )}
    </>
  );
};

export default UpdateProfile;

const StyledDrawer = styled(Drawer)<{ fullMobileWidth?: boolean }>`
  .ant-drawer-content-wrapper {
    width: ${(props) => props.fullMobileWidth && '100% !important'};
  }
`;
