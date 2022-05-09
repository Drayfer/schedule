import { Button, message } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input, InputNumber, SubmitButton } from 'formik-antd';
import React, { useRef } from 'react';
import { IStudent } from '../../models/IStudent';
import * as Yup from 'yup';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import { useAppDispatch } from '../../hooks/redux';
import { updateStudent } from '../../store/reducers/StudentActions';

interface UpdateStudentFormProps {
  student: IStudent;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ValidationSchema = Yup.object().shape({
  name: Yup.string().min(2).required('Required field')
});

const UpdateStudentForm = (props: UpdateStudentFormProps) => {
  const { student, setIsEdit } = props;
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<IStudent>>(null);

  const handleSubmit = async (values: IStudent) => {
    console.log({ studentId: student.id, ...values });
    try {
      await isErrorDispatch(
        dispatch(
          updateStudent({
            studentId: student.id,
            ...values
          })
        )
      );
      setIsEdit(false);
      message.info(`Student profile updated`);
    } catch (err) {
      PopupError(err);
    }
  };

  return (
    <Formik
      initialValues={student}
      onSubmit={handleSubmit}
      innerRef={formRef}
      validationSchema={ValidationSchema}
    >
      <Form className="w-full">
        <FormItem name="name">
          <Input name="name" placeholder="Student name" bordered />
        </FormItem>
        <FormItem name="surname">
          <Input name="surname" placeholder="Student surname" bordered />
        </FormItem>
        <FormItem name="balance">
          <InputNumber name="balance" style={{ width: '100%' }} />
        </FormItem>

        <FormItem name="phone">
          <Input name="phone" placeholder="Student phone" bordered />
        </FormItem>

        <FormItem name="email">
          <Input name="email" placeholder="Student email" bordered />
        </FormItem>

        <FormItem name="skype">
          <Input name="skype" placeholder="Student skype" bordered />
        </FormItem>

        <FormItem name="note">
          <Input.TextArea name="note" rows={4} placeholder="Notes" bordered />
        </FormItem>

        <SubmitButton key="submit" className="w-full rounded-sm">
          Update
        </SubmitButton>
        <Button
          className="w-full rounded-sm mt-2"
          onClick={() => setIsEdit(false)}
        >
          Back
        </Button>
      </Form>
    </Formik>
  );
};

export default UpdateStudentForm;
