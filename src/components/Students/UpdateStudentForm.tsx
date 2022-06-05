import { Button, message } from 'antd';
import { Formik, FormikProps } from 'formik';
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  SubmitButton
} from 'formik-antd';
import React, { useRef } from 'react';
import { IStudent } from '../../models/IStudent';
import * as Yup from 'yup';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import { useAppDispatch } from '../../hooks/redux';
import { updateStudent } from '../../store/reducers/StudentActions';
import { IDiscipline } from '../../models/IDiscipline';
import { LittleRound } from '../Schedule/AddLesson';

const { Option } = Select;

interface UpdateStudentFormProps {
  student: IStudent;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  allDisciplines: IDiscipline[];
}

const ValidationSchema = Yup.object().shape({
  name: Yup.string().min(2).required('Required field')
});

interface UpdateForm extends IStudent {
  selectDisciplines: (string | number)[];
}

const UpdateStudentForm = (props: UpdateStudentFormProps) => {
  const { student, setIsEdit, allDisciplines } = props;
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<UpdateForm>>(null);

  const handleSubmit = async (values: UpdateForm) => {
    // const updateDisciplines = values.selectDisciplines.map((item) =>
    //   typeof item === 'string'
    //     ? allDisciplines.find((dis) => dis.title === item)?.id || 0
    //     : item
    // );

    try {
      await isErrorDispatch(
        dispatch(
          updateStudent({
            studentId: student.id,
            ...values,
            // updateDisciplines,
            balance:
              values.balance === student.balance
                ? 0
                : values.balance - student.balance
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
      initialValues={{
        ...student,
        selectDisciplines: student.disciplines.map((item) => item.title)
      }}
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
          <label className="w-1/5">Balance: </label>
          <InputNumber name="balance" style={{ width: '80%' }} />
        </FormItem>

        <FormItem name="selectDisciplines">
          <Select
            mode="tags"
            placeholder="Select disciplines"
            style={{ width: '100%' }}
            name="selectDisciplines"
            defaultValue={student.disciplines.map((item) => item.title)}
            // defaultValue={allDisciplines
            //   .filter((item) =>
            //     student.disciplines.find((dis) => dis.id === item.id)
            //   )
            //   .map((item) => item.title)}
          >
            {allDisciplines
              .filter(
                (item) => !student.disciplines.find((dis) => dis.id === item.id)
              )
              .map((discipline) => (
                <Option key={discipline.id}>
                  {/* <div className="flex items-center">
                    <LittleRound color={discipline.color} /> */}
                  <div>{discipline.title}</div>
                  {/* </div> */}
                </Option>
              ))}
          </Select>
        </FormItem>

        <FormItem name="age">
          <InputNumber
            placeholder="Student's age"
            name="age"
            min={1}
            max={100}
            style={{ width: '100%' }}
          />
        </FormItem>

        <FormItem name="parent">
          <Input name="parent" placeholder="Parent's name" bordered />
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
