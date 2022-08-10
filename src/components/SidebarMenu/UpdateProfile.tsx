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
  const { user, lang } = useAppSelector((state) => ({
    user: state.user.data,
    lang: state.options.lang
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
      formRef.current?.setFieldError('password', lang.menu[7]);
      formRef.current?.setFieldError('repeatPassword', lang.menu[7]);
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
        message.success(lang.menu[6]);
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
        {lang.menu[8]}
      </div>
      {isInfoUser && (
        <StyledDrawer
          fullMobileWidth={/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )}
          className=""
          title={lang.menu[9]}
          onClose={closeModal}
          visible={isInfoUser}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={closeModal}>{lang.menu[10]}</Button>
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
                        {lang.menu[11]}
                      </label>
                    </div>

                    <Input
                      name="name"
                      placeholder={lang.menu[12]}
                      type="text"
                    />
                  </FormItem>

                  <FormItem name="email">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label
                        htmlFor="email"
                        className="text-gray-500/70 font-bold text-xs"
                      >
                        {lang.menu[13]}
                      </label>
                    </div>

                    <Input
                      name="email"
                      placeholder={lang.menu[14]}
                      type="email"
                    />
                  </FormItem>

                  <FormItem name="password">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label
                        htmlFor="password"
                        className="text-gray-500/70 font-bold text-xs"
                      >
                        {lang.menu[15]}
                      </label>
                    </div>

                    <Input.Password
                      name="password"
                      placeholder={lang.menu[16]}
                      type="password"
                    />
                  </FormItem>

                  <FormItem name="repeatPassword">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <label
                        htmlFor="password"
                        className="text-gray-500/70 font-bold text-xs"
                      >
                        {lang.menu[17]}
                      </label>
                    </div>

                    <Input.Password
                      name="repeatPassword"
                      placeholder={lang.menu[18]}
                      type="password"
                    />
                  </FormItem>

                  <SubmitButton
                    key="submit"
                    className="w-full rounded-sm"
                    loading={loading}
                  >
                    {lang.menu[19]}
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

export const StyledDrawer = styled(Drawer)<{ fullMobileWidth?: boolean }>`
  .ant-drawer-content-wrapper {
    width: ${(props) => props.fullMobileWidth && '100% !important'};
  }
`;
