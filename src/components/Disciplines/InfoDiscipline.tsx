import {
  CloseCircleFilled,
  CloseOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Drawer,
  message,
  Popconfirm,
  Space,
  Tooltip
} from 'antd';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input, Select, SubmitButton } from 'formik-antd';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/redux';
import { IDiscipline } from '../../models/IDiscipline';
import { IStudent } from '../../models/IStudent';
import { updateDiscipline } from '../../store/reducers/DisciplineActions';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import { LittleRound } from '../Schedule/AddLesson';
import { StyledInput } from './AddDisciplineForm';

const { Option } = Select;

interface InfoDisciplineProps {
  discipline: IDiscipline;
  allStudents: IStudent[];
}

export interface IUpdateDisciplineForm {
  studentId: number[];
  title: string;
  color: string;
}

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('Required field')
});

const InfoDiscipline = (props: InfoDisciplineProps) => {
  const { discipline, allStudents } = props;

  const [isInfoStudent, setIsInfoStudent] = useState(false);

  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<IUpdateDisciplineForm>>(null);

  const closeModal = () => {
    setIsInfoStudent(false);
    formRef.current?.resetForm();
  };

  const initialState = {
    studentId: [],
    title: discipline.title,
    color: discipline.color
  };

  const handleSubmit = async (values: IUpdateDisciplineForm) => {
    try {
      await isErrorDispatch(
        dispatch(
          updateDiscipline({
            id: discipline.id,
            title: values.title,
            color: values.color,
            studentId: [
              ...discipline.students.map((item) => item.id),
              ...values.studentId
            ]
          })
        )
      );
      formRef.current?.resetForm();
      closeModal();
      message.success('Discipline updated successfully.');
    } catch (err) {
      PopupError(err);
    }
  };

  return (
    <>
      <Tooltip title="discipline info">
        <InfoCircleOutlined
          style={{
            fontSize: '20px',
            color: '#2884ca'
          }}
          onClick={() => setIsInfoStudent(true)}
        />
      </Tooltip>
      <StyledDrawer
        fullMobileWidth={/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )}
        className=""
        title="Discipline Info"
        // width={390}
        onClose={closeModal}
        visible={isInfoStudent}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={closeModal}>Cancel</Button>
          </Space>
        }
      >
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          innerRef={formRef}
          validationSchema={ValidationSchema}
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

              <FormItem name="title">
                <label
                  htmlFor="title"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  TITLE
                </label>
                <Input name="title" placeholder="Discipline title" bordered />
              </FormItem>

              <FormItem name="studentId">
                <label
                  htmlFor="studentId"
                  className="text-gray-500/70 font-bold text-xs"
                >
                  STUDENTS
                </label>
                <Select
                  mode="tags"
                  placeholder="Select students"
                  style={{ width: '100%' }}
                  name="studentId"
                >
                  {allStudents
                    .filter(
                      (item) =>
                        !item.break &&
                        !discipline.students.find((st) => st.id === item.id)
                    )
                    .map((student) => (
                      <Option key={student.id}>
                        <div className="flex items-center">
                          <LittleRound color={student.color} />
                          <div>{`${student.name} ${student.surname}`}</div>
                        </div>
                      </Option>
                    ))}
                </Select>
              </FormItem>

              {discipline.students.map((student) => {
                return (
                  <div className="flex items-center justify-between hover:bg-slate-200 px-2 bg-slate-100/70 my-1">
                    <div className="flex items-center">
                      <LittleRound color={student.color} />
                      <div>
                        {student.name} {student.surname}
                      </div>
                    </div>

                    <Popconfirm
                      title={`Are you sure to delete ${student.name} ${student.surname}?`}
                      icon={<CloseCircleFilled style={{ color: 'red' }} />}
                      okText="Yes"
                      cancelText="No"
                      onConfirm={async () => {
                        try {
                          await isErrorDispatch(
                            dispatch(
                              updateDiscipline({
                                id: discipline.id,
                                studentId: discipline.students
                                  .filter((item) => item.id !== student.id)
                                  .map((item) => item.id)
                              })
                            )
                          );
                          message.success('Student deleted successfully.');
                        } catch (err) {
                          PopupError(err);
                        }
                      }}
                    >
                      <CloseOutlined
                        twoToneColor="#c11071"
                        style={{ color: 'red' }}
                        className="ml-2 text-sm"
                        onClick={async () => {}}
                      />
                    </Popconfirm>
                  </div>
                );
              })}

              <SubmitButton
                key="submit"
                className="w-full rounded-sm mt-2"
                disabled={!values.title}
                // loading={loading}
              >
                Update
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </StyledDrawer>
    </>
  );
};

export default InfoDiscipline;

const StyledDrawer = styled(Drawer)<{ fullMobileWidth?: boolean }>`
  .ant-drawer-content-wrapper {
    width: ${(props) => props.fullMobileWidth && '100% !important'};
  }
`;
