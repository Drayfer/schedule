import { Formik, FormikValues } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import * as Yup from 'yup';
import { Button } from 'antd';

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Введите валидный email')
    .required('Обязательно к заполнению'),
  password: Yup.string()
    .min(3, 'Слишком короткий пароль')
    .required('Обязательно к заполнению')
});

const LoginPage = () => {
  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Container>
      <div className="tablet:w-96 phone:w-11/12 flex flex-col items-center rounded pt-10 bg-white">
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
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={FormSchema}
          // validateOnBlur
        >
          {/* {({ errors, touched }) => ( */}
          <Form className="mt-12 w-10/12">
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
              />
            </FormItem>
            <FormItem name="password">
              <div className="flex justify-between items-baseline mb-1.5">
                <label
                  htmlFor="password"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  PASSWORD
                </label>
                <span className="text-gray-500/70 font-normal text-xs hover:text-blue-400 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <Input.Password
                name="password"
                placeholder="Password"
                type="password"
              />
            </FormItem>
            <Submit key="submit" className="w-full rounded-sm">
              Log In
            </Submit>
          </Form>
          {/* )} */}
        </Formik>
        <div className="flex mt-8 mb-4 items-baseline">
          <p className="text-gray-500/70 text-sm mr-1.5">
            Don’t have an account?
          </p>
          <a href="/">Sign up</a>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
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
