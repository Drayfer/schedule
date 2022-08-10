import { Button, message, Modal } from 'antd';
import { Formik, FormikProps } from 'formik';
import { DatePicker, Form, FormItem, Input, SubmitButton } from 'formik-antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { INotification } from '../../models/IOption';
import {
  createNotification,
  editNotification
} from '../../store/reducers/OptionsSlice';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';

interface IFormValues {
  note: string;
  date: moment.Moment;
}

interface AddNoteModalProps {
  editId: number | null;
  resetEditId: () => void;
}

const AddNoteModal = (props: AddNoteModalProps) => {
  const { editId, resetEditId } = props;
  const { userId, notes, lang } = useAppSelector((state) => ({
    userId: state.user.data?.id,
    notes: state.options.data?.notificationsArr,
    lang: state.options.lang
  }));
  const dispatch = useAppDispatch();
  const formRef = useRef<FormikProps<IFormValues>>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let initialState = {
    note: '',
    date: moment(new Date()).add(1, 'hours')
  };

  if (editId && notes?.length) {
    const note = notes?.find((note) => note.id === editId) as INotification;
    initialState = {
      note: note.text,
      date: note?.date
    };
  }

  useEffect(() => {
    if (editId) {
      showModal();
    }
  }, [editId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetEditId();
  };

  const handleSubmit = async (values: IFormValues) => {
    try {
      isErrorDispatch(
        dispatch(
          (editId ? editNotification : createNotification)({
            userId: userId || 0,
            id: editId ? editId : Date.now(),
            text: values.note.trim(),
            date: values.date,
            complete: false
          })
        )
      );
      message.success(editId ? lang.notification[13] : lang.notification[12]);
      handleCancel();
    } catch (err) {
      PopupError(err);
    }
  };

  return (
    <>
      <Button type="primary" className="w-full" onClick={showModal}>
        {lang.notification[2]}
      </Button>
      {isModalVisible && (
        <Modal
          title={lang.notification[8]}
          visible={isModalVisible}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: 'none' } }}
          cancelText={lang.notification[1]}
        >
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            innerRef={formRef}
          >
            {({ values }) => (
              <Form className="mt-12 w-full">
                <FormItem name="note">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <label
                      htmlFor="note"
                      className="text-gray-500/70 font-bold text-xs"
                    >
                      {lang.notification[9]}
                    </label>
                  </div>

                  <Input.TextArea
                    rows={3}
                    name="note"
                    placeholder={lang.notification[10]}
                  />
                </FormItem>
                <FormItem name="date" className="w-full">
                  <DatePicker
                    disabledDate={(date) => date.valueOf() < Date.now()}
                    className="w-full"
                    showTime={{ format: 'HH:mm' }}
                    name="date"
                    format={'DD.MM.YYYY HH:mm'}
                  />
                </FormItem>

                <SubmitButton
                  key="submit"
                  className="w-full rounded-sm"
                  disabled={!values.note.trim()}
                >
                  {editId ? lang.notification[14] : lang.notification[11]}
                </SubmitButton>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  );
};

export default AddNoteModal;
