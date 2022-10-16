import React, { useRef } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { PopupError } from '../helpers/PopupError';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { FormItem, Input, SubmitButton, Form } from 'formik-antd';
import emailjs from '@emailjs/browser';
import { message } from 'antd';
import TeachAppLogo from '../../assets/images/TeachAppLogo.png';

export interface IContactForm {
  name: string;
  body: string;
  email: string;
}

const Contacts = () => {
  const { lang } = useAppSelector((state) => ({
    lang: state.options.lang.footer
  }));

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(lang[4]),
    body: Yup.string().required(lang[4]),
    email: Yup.string().email(lang[5]).required(lang[4])
  });

  const formRef = useRef<FormikProps<IContactForm>>(null);

  const handleSubmit = async (values: IContactForm) => {
    const messageEmail = {
      reply_to: values.email,
      body: values.body,
      from_name: values.name
    };
    try {
      await emailjs.send(
        'service_ftn9ait',
        'template_4wnqbrw',
        messageEmail,
        'ExHPjNuL9jXnbsEFf'
      );
      message.success(lang[6]);
      formRef.current?.resetForm();
    } catch (err) {
      PopupError(err);
    }
  };

  const initialState: IContactForm = {
    name: '',
    body: '',
    email: ''
  };

  return (
    <div className="bg-[#111111] text-white flex pt-8 flex-wrap" id="contacts">
      <div className="max-w-[550px] min-w-[350px] mx-auto my-4 text-base px-3">
        <div>
          <span>Telegram:</span>{' '}
          <a className="text-sm" href="https://t.me/t_app_chat">
            https://t.me/t_app_chat
          </a>
        </div>
        <div>
          <span className="mt-4">Email:</span>{' '}
          <a className="text-sm" href="mailto:teachers.app24@gmail.com">
            teachers.app24@gmail.com
          </a>
        </div>
        <img
          src={TeachAppLogo}
          alt="logo"
          className="h-24 w-auto mt-6 hidden tablet:block"
        />
      </div>
      <div className="max-w-[550px] min-w-[350px] mx-auto pb-10 px-3">
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={ValidationSchema}
          innerRef={formRef}
          validateOnChange
        >
          {(props: FormikProps<IContactForm>) => (
            <Form>
              <FormItem name="name" hasFeedback={false}>
                <Input name="name" type="text" placeholder={lang[8]} />
              </FormItem>
              <FormItem name="body" hasFeedback={false}>
                <Input.TextArea name="body" rows={3} placeholder={lang[9]} />
              </FormItem>
              <FormItem name="email" hasFeedback={false}>
                <Input name="email" type="text" placeholder={lang[10]} />
              </FormItem>

              <SubmitButton
                key="submit"
                className="w-full rounded-sm cursor-pointer"
                disabled={false}
              >
                <span className="cursor-pointer">{lang[7]}</span>
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contacts;
