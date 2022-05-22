import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, Switch } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input, InputNumber, SubmitButton } from 'formik-antd';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createStudent } from '../../store/reducers/StudentActions';
import { PopupError } from '../helpers/PopupError';

export interface IAddStudentForm {
  name: string;
  surname?: string;
  balance: number;
  showBalance: boolean;
}

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required field')
});

const initialState = {
  name: '',
  surname: '',
  balance: 0,
  showBalance: true
};

const AddStudentForm = () => {
  const { loading, userId } = useAppSelector((state) => ({
    loading: state.student.isLoading,
    userId: state.user.data?.id || 0
  }));

  const [isAddStudent, setIsAddStudent] = useState(false);
  const formRef = useRef<FormikProps<IAddStudentForm>>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IAddStudentForm) => {
    try {
      const response = await dispatch(createStudent({ ...values, userId }));
      if (response.hasOwnProperty('error'))
        throw new Error(JSON.stringify(response.payload));
      formRef.current?.resetForm();
      setIsAddStudent(false);
    } catch (err) {
      PopupError(err);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => setIsAddStudent(true)}
        className="mr-2"
      >
        Add new
      </Button>
      <Drawer
        title="Add a new student"
        width={390}
        onClose={() => setIsAddStudent(false)}
        visible={isAddStudent}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setIsAddStudent(false)}>Cancel</Button>
          </Space>
        }
      >
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}
          innerRef={formRef}
        >
          {({ errors, values, setErrors, setFieldError }) => (
            <Form className="w-full">
              <FormItem name="name">
                <label
                  htmlFor="name"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  NAME
                </label>
                <Input name="name" placeholder="Student name" bordered />
              </FormItem>

              <FormItem name="surname">
                <label
                  htmlFor="surname"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  SURNAME
                </label>
                <Input name="surname" placeholder="Student surname" bordered />
              </FormItem>

              <FormItem name="balance">
                <div className="flex flex-col mb-2">
                  <label
                    htmlFor="balance"
                    className="text-gray-500/70 font-bold text-xs mb-1"
                  >
                    PAID LESSONS
                  </label>
                  <div>
                    <Switch
                      checkedChildren="hide"
                      unCheckedChildren="show"
                      size="small"
                      checked={values.showBalance}
                      onChange={() =>
                        formRef.current?.setFieldValue(
                          'showBalance',
                          !values.showBalance
                        )
                      }
                    />
                  </div>
                  {values.showBalance && (
                    <InputNumber name="balance" min={0} defaultValue={0} />
                  )}
                </div>
              </FormItem>

              <SubmitButton
                key="submit"
                className="w-full rounded-sm"
                disabled={!values.name}
                loading={loading}
              >
                Add
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};

export default AddStudentForm;
