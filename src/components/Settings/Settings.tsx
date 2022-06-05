import { Card, Col, InputNumber, Row, Slider, Switch } from 'antd';
import React from 'react';

const Settings = () => {
  return (
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
            <p>
              <Switch size="small" checked={true} />
            </p>
            <InputNumber
              min={0}
              defaultValue={5}
              value={5}
              style={{ width: 70 }}
            />

            <Slider className="pt-2" defaultValue={30} disabled={false} />
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
              defaultValue={5}
              value={5}
              style={{ width: 70 }}
            />
            <InputNumber
              min={0}
              defaultValue={5}
              value={5}
              style={{ width: 70 }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Settings;
