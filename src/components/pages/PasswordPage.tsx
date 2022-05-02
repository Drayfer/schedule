import { Button } from 'antd';
import axios from 'axios';
import { Formik, FormikProps, FormikValues } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import * as Yup from 'yup';

type Props = {};

const ValidationSchema = Yup.object().shape({
  password: Yup.string().min(5, 'Too short password').required('Required field')
});

const PasswordPage = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const formRef = useRef<FormikProps<FormikValues>>(null);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/checkJwt`, {
        headers: {
          Authorization: `Bearer ${id}`
        }
      })
      .then((response) => setUserEmail(response.data.email));
  }, [id]);

  const handleSubmit = async (values: FormikValues) => {
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/setNewPassword`, {
        email: userEmail,
        password: values.password
      });
      setIsComplete(true);
    } catch (e) {
      console.dir(e);
    } finally {
      setLoading(false);
    }
  };

  if (isComplete) {
    return (
      <Container>
        <div className="tablet:w-96 phone:w-11/12 flex flex-col items-center rounded pt-10 bg-white pb-4">
          <p className="text-slate-900/70 text-lg text-center font-semibold">
            Password changed successfully!
          </p>
          <p className="text-slate-900/70 text-lg text-center">
            You can log in using the new password.
          </p>
          <Button type="link" onClick={() => navigate('/login')}>
            Go to login page
          </Button>
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
        <p className="mt-1 font-normal">
          Your email: <span className="font-semibold">{userEmail}</span>
        </p>
        <Formik
          initialValues={{ password: '' }}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}
          innerRef={formRef}
          validateOnBlur
        >
          {({ values, errors }) => (
            <Form className="mt-12 w-10/12">
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

              <Submit
                key="submit"
                className="w-full rounded-sm"
                loading={loading}
                disabled={!values.password || !!errors.password}
              >
                Set new password
              </Submit>
            </Form>
          )}
        </Formik>
        <Button type="link" onClick={() => navigate('/login')}>
          Go back
        </Button>
      </div>
    </Container>
  );
};

export default PasswordPage;

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
