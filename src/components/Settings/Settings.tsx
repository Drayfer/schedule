import { Card, Col, message, Row } from 'antd';
import { Formik } from 'formik';
import { Button } from 'antd';
import {
  Form,
  FormItem,
  SubmitButton,
  InputNumber,
  Switch,
  Slider,
  Select
} from 'formik-antd';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchOptionsData,
  getBilling,
  updateDataOption
} from '../../store/reducers/OptionsSlice';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';
import { useLogOut } from '../helpers/LogOut';
import UpdateProfile from '../SidebarMenu/UpdateProfile';
import TarifCard from './TarifCard';
import PaidPeriodInfo from './PaidPeriodInfo';
import FooterLanding from '../Footer/FooterLanding';

interface IFormSettings {
  notification: boolean;
  notifyMinutes: number;
  notifyVolume: number;
  rateWithBalance: number;
  rateWithoutBalance: number;
  currency: string;
}

const Settings = () => {
  const {
    userId,
    notification,
    notifyMinutes,
    notifyVolume,
    rateWithBalance,
    rateWithoutBalance,
    currency,
    lang
  } = useAppSelector((state) => ({
    userId: state.user.data?.id,
    currency: state.options.data?.currency || '',
    notification: state.options.data?.notification || false,
    notifyMinutes: state.options.data?.notifyMinutes || 3,
    notifyVolume: state.options.data?.notifyVolume || 100,
    rateWithBalance: state.options.data?.rateWithBalance || 0,
    rateWithoutBalance: state.options.data?.rateWithoutBalance || 0,
    lang: state.options.lang
  }));

  const initialValues = {
    notification: notification,
    notifyMinutes: notifyMinutes,
    notifyVolume: notifyVolume,
    rateWithBalance: rateWithBalance,
    rateWithoutBalance: rateWithoutBalance,
    currency: currency
  };

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const logOut = useLogOut();

  useEffect(() => {
    if (userId) {
      try {
        isErrorDispatch(dispatch(fetchOptionsData(userId)));
      } catch (err) {
        PopupError(err);
      }
    }
    // eslint-disable-next-line
  }, [userId]);

  const handleSubmit = async (values: IFormSettings) => {
    if (userId) {
      try {
        setLoading(true);
        await isErrorDispatch(
          dispatch(updateDataOption({ userId, ...values }))
        );
        message.info(lang.settings[0]);
      } catch (err) {
        PopupError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      setTimeout(() => {
        dispatch(getBilling(userId));
      }, 1000);
    }
  }, [userId, dispatch]);

  return (
    <>
      <PaidPeriodInfo />
      <TarifCard />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, touched, setFieldValue }) => {
          return (
            <Form className="mt-2 w-full">
              <div className="flex justify-center mt-10 gap-4 flex-wrap">
                <Card
                  type="inner"
                  title={lang.settings[1]}
                  bordered={false}
                  style={{ minWidth: 320 }}
                >
                  <Row>
                    <Col className="w-3/5">
                      <p>{lang.settings[2]}:</p>
                      <p>{lang.settings[3]}:</p>
                      <p>{lang.settings[4]}:</p>
                    </Col>

                    <Col className="w-2/5">
                      <p>
                        <Switch name="notification" size="small" />
                      </p>
                      <FormItem name="notifyMinutes">
                        <InputNumber
                          min={0}
                          name="notifyMinutes"
                          style={{ width: 70 }}
                          disabled={!values.notification}
                        />
                      </FormItem>
                      <Slider
                        name="notifyVolume"
                        style={{ marginTop: '-0.8rem' }}
                        disabled={!values.notification}
                      />
                    </Col>
                  </Row>
                </Card>

                <Card
                  type="inner"
                  title={lang.settings[5]}
                  bordered={false}
                  style={{ minWidth: 320 }}
                >
                  <Row>
                    <Col className="mr-1">
                      <p>{lang.settings[6]}:</p>
                      <p>{lang.settings[7]}:</p>
                      <p>{lang.settings[8]}:</p>
                    </Col>
                    <Col>
                      <InputNumber
                        min={0}
                        name="rateWithBalance"
                        style={{ width: 80, display: 'block' }}
                      />

                      <InputNumber
                        min={0}
                        name="rateWithoutBalance"
                        style={{ width: 80, display: 'block' }}
                      />

                      <Select
                        name="currency"
                        value={values.currency}
                        style={{ width: 80, display: 'block' }}
                        className="mt-2"
                      >
                        <Select.Option value="USD">USD</Select.Option>
                        <Select.Option value="EUR">EUR</Select.Option>
                        <Select.Option value="UAH">UAH</Select.Option>
                        <Select.Option value="RUB">RUB</Select.Option>
                      </Select>
                    </Col>
                  </Row>
                </Card>
                <div className="w-full flex justify-start flex-col items-center">
                  <SubmitButton
                    key="submit"
                    className="w-[150px] rounded-sm"
                    loading={loading}
                    // disabled={!Object.keys(touched).length}
                  >
                    {lang.settings[9]}
                  </SubmitButton>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="w-full flex justify-start flex-col items-center mb-5">
        <div className="text-[#1890ff] mt-3">
          <UpdateProfile />
        </div>
        <Button type="link" onClick={logOut}>
          {lang.settings[10]}
        </Button>
      </div>
      <FooterLanding />
    </>
  );
};

export default Settings;
