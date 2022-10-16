import { PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Space } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input, Select, SubmitButton } from 'formik-antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createDiscipline } from '../../store/reducers/DisciplineActions';
import { PopupError } from '../helpers/PopupError';
const randomColor = require('randomcolor');

const { Option } = Select;

export interface IAddDisciplineForm {
  studentId: number[];
  title: string;
  color: string;
}

const AddDisciplineForm = () => {
  const { userId, students, loading, lang, billing } = useAppSelector(
    (state) => ({
      userId: state.user.data?.id || 0,
      students: state.student.data,
      loading: state.discipline.isLoading,
      lang: state.options.lang,
      billing: state.options.billing
    })
  );

  const ValidationSchema = Yup.object().shape({
    title: Yup.string().required(lang.disciplines[9])
  });

  const [isAddDiscipline, setIsAddDiscipline] = useState(false);
  const formRef = useRef<FormikProps<IAddDisciplineForm>>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IAddDisciplineForm) => {
    try {
      const response = await dispatch(createDiscipline({ ...values, userId }));
      if (response.hasOwnProperty('error'))
        throw new Error(JSON.stringify(response.payload));
      formRef.current?.resetForm();
      setIsAddDiscipline(false);
    } catch (err) {
      PopupError(err);
    }
  };

  useEffect(() => {
    formRef.current?.setFieldValue('color', randomColor());
  });

  const initialState = {
    studentId: [],
    title: '',
    color: randomColor()
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => billing?.paidDays !== 0 && setIsAddDiscipline(true)}
        className="mr-2"
      >
        {lang.disciplines[10]}
      </Button>
      <Drawer
        title={lang.disciplines[11]}
        width={390}
        onClose={() => setIsAddDiscipline(false)}
        visible={isAddDiscipline}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setIsAddDiscipline(false)}>
              {lang.disciplines[12]}
            </Button>
          </Space>
        }
      >
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}
          innerRef={formRef}
        >
          {({ errors, values, setErrors, setFieldError, setFieldTouched }) => (
            <Form className="w-full">
              <div className="flex items-center">
                <div className="relative">
                  <Avatar
                    style={{
                      backgroundColor: values.color,
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
                    {values.title.slice(0, 1)}
                  </Avatar>
                  <StyledInput type="color" name="color" />
                </div>
                <span className="font-bold text-lg">{values.title}</span>
              </div>

              <FormItem name="name">
                <label
                  htmlFor="title"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  {lang.disciplines[13]}
                </label>
                <Input
                  name="title"
                  placeholder={lang.disciplines[14]}
                  bordered
                />
              </FormItem>

              <FormItem name="studentId">
                <label
                  htmlFor="studentId"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  {lang.disciplines[15]}
                </label>
                <Select
                  mode="tags"
                  placeholder={lang.disciplines[16]}
                  style={{ width: '100%' }}
                  name="studentId"
                >
                  {students
                    .filter((item) => !item.break)
                    .map((student) => (
                      <Option
                        key={student.id}
                      >{`${student.name} ${student.surname}`}</Option>
                    ))}
                </Select>
              </FormItem>

              <SubmitButton
                key="submit"
                className="w-full rounded-sm"
                disabled={!values.title}
                loading={loading}
              >
                {lang.disciplines[17]}
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default AddDisciplineForm;

export const StyledInput = styled(Input)`
  padding: 0;
  border: none;
  width: 20px;
  height: 20px !important;
  cursor: pointer;
  position: absolute;
  left: 0;
  bottom: 0;
`;
