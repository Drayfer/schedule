import { Card, Col, Row } from 'antd';
import React from 'react';
import LessonsChart from './LessonsChart';

const Statistics = () => {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <Card
        type="inner"
        title="Lessons"
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <Col className="w-3/5">
            <p>Peer week:</p>
            <p>Peer month:</p>
            <p>Total:</p>
          </Col>
          <Col className="w-2/5">
            <p>5</p>
            <p>24</p>
            <p>48</p>
          </Col>
        </Row>
      </Card>

      <Card
        type="inner"
        title="Students"
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <Col className="w-3/5">
            <p>Active:</p>
            <p>Hide:</p>
            <p>Delete:</p>
          </Col>
          <Col className="w-2/5">
            <p>5</p>
            <p>24</p>
            <p>12</p>
          </Col>
        </Row>
      </Card>

      <Card
        type="inner"
        title="Finance"
        bordered={false}
        style={{ width: 300 }}
      >
        <Row>
          <Col className="w-3/5">
            <p>Per week:</p>
            <p>Per month:</p>
            <p>Total:</p>
          </Col>
          <Col className="w-2/5">
            <p>1000</p>
            <p>3500</p>
            <p>10500</p>
          </Col>
        </Row>
      </Card>
      <Card
        type="inner"
        title="Intensity Graph"
        bordered={false}
        style={{ width: '100%' }}
      >
        <LessonsChart />
      </Card>
    </div>
  );
};

export default Statistics;
