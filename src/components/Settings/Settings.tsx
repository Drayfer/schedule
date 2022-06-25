import { Card, Col, InputNumber, Row, Slider, Switch } from 'antd';
import { Formik } from 'formik';
import { Form, FormItem, Input, SubmitButton } from 'formik-antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchOptionsData } from '../../store/reducers/OptionsSlice';
import { isErrorDispatch, PopupError } from '../helpers/PopupError';

interface IFormSettings {
  notification: boolean;
  notifyMinutes: number;
  notifyVolume: number;
  rateWithBalance: number;
  rateWithoutBalance: number;
}

const Settings = () => {
  const {
    userId,
    notification,
    notifyMinutes,
    notifyVolume,
    rateWithBalance,
    rateWithoutBalance
  } = useAppSelector((state) => ({
    userId: state.user.data?.id,
    notification: state.options.data?.notification || true,
    notifyMinutes: state.options.data?.notifyMinutes || 3,
    notifyVolume: state.options.data?.notifyVolume || 100,
    rateWithBalance: state.options.data?.rateWithBalance || 0,
    rateWithoutBalance: state.options.data?.rateWithoutBalance || 0
  }));

  const initialValues = {
    notification: notification,
    notifyMinutes: notifyMinutes,
    notifyVolume: notifyVolume,
    rateWithBalance: rateWithBalance,
    rateWithoutBalance: rateWithoutBalance
  };

  const dispatch = useAppDispatch();

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
    console.log(values);
    try {
      // setLoading(true);
      // await axios.put(`${process.env.REACT_APP_API_URL}/user/setNewPassword`, {
      //   email: user?.email,
      //   password: values.password
      // });
      // setIsInfoUser(false);
      // formRef.current?.resetForm();
    } catch (err) {
      PopupError(err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validationSchema={ValidationSchema}
      // innerRef={formRef}
      validateOnBlur
    >
      {({ values, errors, setFieldValue }) => (
        <Form className="mt-12 w-full">
          <div className="flex justify-center gap-4 m-32 flex-wrap">
            <Card
              type="inner"
              title="Notifications"
              bordered={false}
              style={{ width: 320 }}
            >
              <Row>
                <Col className="w-3/5">
                  <p>Enable:</p>
                  <p>Notify (minutes):</p>
                  <p>Volume:</p>
                </Col>

                <Col className="w-2/5">
                  {/* <FormItem name="notification"> */}
                  <p>
                    <Switch
                      size="small"
                      checked={values.notification}
                      onChange={() =>
                        setFieldValue('notification', !values.notification)
                      }
                    />
                  </p>
                  {/* </FormItem> */}
                  <InputNumber
                    min={0}
                    value={values.notifyMinutes}
                    onChange={(value: number) =>
                      setFieldValue('notifyMinutes', value)
                    }
                    style={{ width: 70 }}
                    disabled={!values.notification}
                  />

                  <Slider
                    className="pt-2"
                    value={values.notifyVolume}
                    onChange={(value: number) =>
                      setFieldValue('notifyVolume', value)
                    }
                    disabled={!values.notification}
                  />
                </Col>
              </Row>
            </Card>

            <Card
              type="inner"
              title="Students"
              bordered={false}
              style={{ width: 320 }}
            >
              <Row>
                <Col className="w-3/5">
                  <p>Base price with balance:</p>
                  <p>Base price without balance:</p>
                </Col>
                <Col className="w-2/5">
                  <InputNumber
                    min={0}
                    value={values.rateWithBalance}
                    onChange={(value: number) =>
                      setFieldValue('rateWithBalance', value)
                    }
                    style={{ width: 70 }}
                  />
                  <InputNumber
                    min={0}
                    value={values.rateWithoutBalance}
                    onChange={(value: number) =>
                      setFieldValue('rateWithoutBalance', value)
                    }
                    style={{ width: 70 }}
                  />
                </Col>
              </Row>
            </Card>
            <div className="w-full flex justify-center">
              <SubmitButton
                key="submit"
                className="w-[150px] rounded-sm"

                // loading={loading}
                // disabled={
                //   !values.password ||
                //   !values.repeatPassword ||
                //   !!errors.password
                //}
              >
                Save Settings
              </SubmitButton>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Settings;
