import { Formik, FormikProps, FormikValues } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import * as Yup from 'yup';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  AxiosErrorMessage,
  fetchUsers,
  registration
} from '../../store/reducers/UserActions';
import { reset } from '../../store/reducers/UserSlice';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { IUser } from '../../models/IUser';
import { useNavigate } from 'react-router-dom';
const FormSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Required field'),
  password: Yup.string().min(3, 'Too short password').required('Required field')
});

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Enter valid email').required('Required field')
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<FormikValues>>(null);
  const [errorFormMessage, setErrorFormMessage] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendForgotPassword = async (
    token: string,
    name: string,
    email: string
  ) => {
    const message = {
      link: `${window.location.origin}/password/${token}`,
      reply_to: email,
      to_name: name,
      from_name: 'Shedule App'
    };
    await emailjs.send(
      'service_iwc765c',
      'template_gxp0r2f',
      message,
      'TxI221uSyQgO0EGEB'
    );
  };

  const sendEmailRefistration = async (
    token: string,
    email: string,
    name: string,
    password: string
  ) => {
    const message = {
      message: `Registration completed, follow the link below to verify your account:
      ${window.location.origin}/activate/${token}`,
      reply_to: email,
      to_name: name,
      from_name: 'Shedule App',
      password: password
    };
    emailjs
      .send('service_iwc765c', 'template_7l1ybxv', message, 'TxI221uSyQgO0EGEB')
      .then(
        () => {
          setIsSuccessRegistration(true);
          // dispatch(reset());
        },
        (error) => {
          throw new Error(error.text);
        }
      );
  };

  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);
    if (isRegistration) {
      if (values.name === '' || values.name.length < 2)
        formRef.current?.setFieldError('name', 'Too short name');
      try {
        const { data } = await axios.post<IUser>(
          `${process.env.REACT_APP_API_URL}/auth/registration`,
          {
            email: values.email,
            password: values.password,
            name: values.name
          }
        );
        await sendEmailRefistration(
          data.token,
          values.email,
          values.name,
          values.password
        );
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setErrorFormMessage(
            (err.response?.data as AxiosErrorMessage).message
          );
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    if (isForgotPassword) {
      // forgot password case
      try {
        const { data } = await axios.post<{ token: string; name: string }>(
          `${process.env.REACT_APP_API_URL}/auth/forgotPassword`,
          {
            email: values.email
          }
        );
        if (data?.token) {
          await sendForgotPassword(data.token, data.name, values.email);
          setShowMessage(true);
          formRef.current?.resetForm();
        }
      } catch (e) {
        setErrorFormMessage('This email was not found');
      } finally {
        setLoading(false);
      }
      return;
    }

    const response = await dispatch(
      fetchUsers({ email: values.email, password: values.password })
    );
    if (response.hasOwnProperty('error'))
      setErrorFormMessage('Не удалось найти пользователя');
    setLoading(false);
  };

  useEffect(() => {
    if (user.error) {
      setErrorFormMessage(user.error);
      return;
    }
    if (user.error === '' && user.data) {
      navigate('/dashboard');
    }
  }, [user]);

  if (isSuccessRegistration) {
    return (
      <Container>
        <div className="tablet:w-96 phone:w-11/12 flex flex-col items-center rounded pt-10 bg-white">
          <div className="mt-2 mb-8 font-normal text-slate-900/70 text-lg flex flex-col justify-center align-middle">
            <p className="text-center font-extrabold">
              Registration completed successfully!
            </p>
            <p className="text-center mb-8">
              {formRef.current?.values.name}, check your email and follow the
              instructions to activate your account.
            </p>
            <Button
              type="primary"
              size="large"
              className="w-56 self-center"
              onClick={() => {
                setIsRegistration(false);
                setIsSuccessRegistration(false);
              }}
            >
              Ok
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="tablet:w-96 phone:w-11/12 flex flex-col items-center rounded pt-10 bg-white pb-4">
        <img src={Logo} alt="logo" className="" />
        <h1 className="mt-2 font-semibold text-gray-500/70 text-lg">
          Dashboard Kit
        </h1>
        <h2 className="mt-3 tablet:text-2xl phone:text-xl font-bold">
          Log In to Dashboard Kit
        </h2>
        <p className="mt-1 font-normal text-sm text-gray-500/90">
          Enter your email and password below
        </p>
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          onSubmit={handleSubmit}
          validationSchema={
            isForgotPassword ? ForgotPasswordSchema : FormSchema
          }
          innerRef={formRef}
        >
          {({ errors, values, setErrors, setFieldError }) => (
            <Form className="mt-12 w-10/12">
              {isRegistration && (
                <FormItem name="name">
                  <label
                    htmlFor="name"
                    className="text-gray-500/70 font-bold text-xs"
                  >
                    NAME
                  </label>
                  <Input
                    name="name"
                    placeholder="Your name"
                    // type="email"
                    bordered
                    onChange={() => setErrorFormMessage('')}
                  />
                </FormItem>
              )}
              <FormItem name="email">
                <label
                  htmlFor="email"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  EMAIL
                </label>
                <Input
                  name="email"
                  placeholder="Email address"
                  type="email"
                  bordered
                  onChange={() => setErrorFormMessage('')}
                />
              </FormItem>
              {!isForgotPassword && (
                <FormItem name="password">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label
                      htmlFor="password"
                      className="text-gray-500/70 font-bold text-xs"
                    >
                      PASSWORD
                    </label>
                    <span
                      className="text-gray-500/70 font-normal text-xs hover:text-blue-400 cursor-pointer"
                      onClick={() => {
                        setIsForgotPassword(true);
                        window.history.replaceState(
                          null,
                          'Reset password - Shedule App',
                          '/reset'
                        );
                      }}
                    >
                      Forgot password?
                    </span>
                  </div>

                  <Input.Password
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={() => setErrorFormMessage('')}
                  />
                </FormItem>
              )}
              <Submit
                key="submit"
                className="w-full rounded-sm"
                disabled={!!errorFormMessage}
                loading={loading}
              >
                {isRegistration
                  ? 'Sign Up'
                  : isForgotPassword
                  ? 'Reset password'
                  : 'Log In'}
              </Submit>
            </Form>
          )}
        </Formik>
        {errorFormMessage && (
          <p className="text-red-600 text-sm mt-2">{errorFormMessage}</p>
        )}
        {showMessage && isForgotPassword && (
          <p className="text-green-600 text-sm mt-2 w-3/4 text-center">
            Check your email and follow the instructions to reset your password.
          </p>
        )}
        {(isForgotPassword || isRegistration) && (
          <Button
            type="link"
            onClick={() => {
              setIsRegistration(false);
              setIsForgotPassword(false);
              window.history.replaceState(
                null,
                'Log in - Shedule App',
                '/login'
              );
            }}
          >
            Go back
          </Button>
        )}
        {!isRegistration && (
          <div className="flex mt-8 items-baseline">
            <p className="text-gray-500/70 text-sm mr-1.5">
              Don’t have an account?
            </p>
            <p
              className="cursor-pointer text-blue-500 font-normal"
              onClick={() => {
                setIsRegistration(true);
                setIsForgotPassword(false);
                window.history.replaceState(
                  null,
                  'Sign up - Shedule App',
                  '/registration'
                );
              }}
            >
              Sign up
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default LoginPage;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 70px 0;
  overflow: auto;
  background-color: #363740;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  position: relative;
  box-sizing: border-box;
  min-height: 100%;
`;

const Submit = styled(SubmitButton)`
  height: 40px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
`;
