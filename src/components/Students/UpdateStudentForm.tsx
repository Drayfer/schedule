import { Avatar, Button, message } from 'antd';
import { Formik, FormikProps } from 'formik';
import {
  DatePicker,
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
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateStudent } from '../../store/reducers/StudentActions';
import { IDiscipline } from '../../models/IDiscipline';
import { updateDiscipline } from '../../store/reducers/DisciplineActions';
import { updateStudentDisciplines } from '../../store/reducers/StudentSlice';
import { StyledInput } from '../Disciplines/AddDisciplineForm';

const { Option } = Select;

interface UpdateStudentFormProps {
  student: IStudent;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  allDisciplines: IDiscipline[];
}

interface UpdateForm extends IStudent {
  selectDisciplines?: string[];
}

const UpdateStudentForm = (props: UpdateStudentFormProps) => {
  const { student, setIsEdit, allDisciplines } = props;
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang
  }));

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().min(2).required(lang.students[49])
  });
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<UpdateForm>>(null);

  const handleSubmit = async (values: UpdateForm) => {
    const updateDisciplines = values.selectDisciplines?.map((item) => {
      return isNaN(Number(item))
        ? allDisciplines.find((dis) => dis.title === item)?.id || 0
        : Number(item);
    });
    delete values.selectDisciplines;

    try {
      await isErrorDispatch(
        dispatch(
          updateStudent({
            studentId: student.id,
            ...values,
            updateDisciplines,
            balance:
              values.balance === student.balance
                ? 0
                : values.balance - student.balance
          })
        )
      );
      setIsEdit(false);
      message.info(lang.students[50]);
    } catch (err) {
      PopupError(err);
    }
  };

  const handleSelect = async (value: string, type: 'select' | 'deselect') => {
    const disciplineId = isNaN(Number(value))
      ? allDisciplines.find((dis) => dis.title === value)?.id || 0
      : Number(value);
    try {
      await isErrorDispatch(
        dispatch(
          updateDiscipline({
            id: disciplineId,
            studentId:
              type === 'select'
                ? [
                    ...(allDisciplines
                      .find((item) => item.id === disciplineId)
                      ?.students.map((item) => item.id) || []),
                    student.id
                  ]
                : allDisciplines
                    .find((item) => item.id === disciplineId)
                    ?.students.filter((item) => item.id !== student.id)
                    .map((item) => item.id) || []
          })
        )
      );
      const newD = allDisciplines.find((item) => item.id === disciplineId);
      if (newD) {
        dispatch(
          updateStudentDisciplines({
            disciplines:
              type === 'select'
                ? [...student.disciplines, newD]
                : [
                    ...student.disciplines.filter((item) => item.id !== newD.id)
                  ],
            id: student.id
          })
        );
      }
      message.success(
        type === 'select' ? lang.students[51] : lang.students[52]
      );
    } catch (err) {
      PopupError(err);
    }
  };

  return (
    <Formik
      initialValues={{
        ...student,
        selectDisciplines: student?.disciplines.map((item) => item.title)
      }}
      onSubmit={handleSubmit}
      innerRef={formRef}
      validationSchema={ValidationSchema}
    >
      {({ values }) => (
        <Form className="w-full">
          <div className="relative mb-2">
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
              {student.name.slice(0, 1)}
            </Avatar>
            <StyledInput type="color" name="color" />
          </div>
          <FormItem name="name">
            <Input name="name" placeholder={lang.students[53]} bordered />
          </FormItem>
          <FormItem name="surname">
            <Input name="surname" placeholder={lang.students[54]} bordered />
          </FormItem>
          <FormItem name="balance">
            <label className="w-1/5">{lang.students[55]}: </label>
            <InputNumber name="balance" style={{ width: '80%' }} />
          </FormItem>

          <FormItem name="selectDisciplines">
            <Select
              mode="tags"
              placeholder={lang.students[56]}
              style={{ width: '100%' }}
              name="selectDisciplines"
              onSelect={(value: string) => handleSelect(value, 'select')}
              onDeselect={(value: string) => handleSelect(value, 'deselect')}
            >
              {allDisciplines
                .filter(
                  (item) =>
                    !student.disciplines.find((dis) => dis.id === item.id) &&
                    !item?.deletedAt
                )
                .map((discipline) => (
                  <Option key={discipline.id}>
                    <div>{discipline.title}</div>
                  </Option>
                ))}
            </Select>
          </FormItem>

          <FormItem name="birthday">
            <DatePicker
              name="birthday"
              placeholder={lang.students[57]}
              bordered
              format={'DD.MM.YYYY'}
              style={{ width: '100%' }}
            />
          </FormItem>

          <FormItem name="parent">
            <Input name="parent" placeholder={lang.students[58]} bordered />
          </FormItem>

          <FormItem name="phone">
            <Input name="phone" placeholder={lang.students[59]} bordered />
          </FormItem>

          <FormItem name="email">
            <Input name="email" placeholder={lang.students[60]} bordered />
          </FormItem>

          <FormItem name="skype">
            <Input name="skype" placeholder={lang.students[61]} bordered />
          </FormItem>

          <FormItem name="note">
            <Input.TextArea
              name="note"
              rows={4}
              placeholder={lang.students[62]}
              bordered
            />
          </FormItem>

          <SubmitButton key="submit" className="w-full rounded-sm">
            {lang.students[63]}
          </SubmitButton>
          <Button
            className="w-full rounded-sm mt-2"
            onClick={() => setIsEdit(false)}
          >
            {lang.students[64]}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateStudentForm;
