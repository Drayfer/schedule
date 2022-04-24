import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Card, Col, List, Row } from 'antd';
import styled from 'styled-components';

const Schedule = () => {
  const data = [
    '10.00 Виктор',
    '11.00 Иван',
    '14.00 Андрей',
    '20.00 Константин'
  ];

  return (
    <Row justify="center" gutter={[20, 5]}>
      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
        <Col>
          <Card
            size="small"
            title="Понедельник"
            extra={'10.11.2022'}
            // style={{ width: 300 }}
            style={{ width: 300, marginTop: 16, zIndex: 0 }}
            type="inner"
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />
            ]}
          >
            <List
              size="small"
              dataSource={data}
              renderItem={(item) => <ListItem>{item}</ListItem>}
            />
          </Card>
        </Col>
      ))}
      <Col className="bg-slate-500 tablet:w-fit desktop:w-1/2">
        <Card
          size="small"
          title="Понедельник"
          extra={'10.11.2022'}
          // style={{ width: 300 }}
          style={{ width: 300, marginTop: 16, zIndex: 0 }}
          type="inner"
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />
          ]}
        >
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => <ListItem>{item}</ListItem>}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Schedule;

const ListItem = styled(List.Item)`
  padding: 0px 5px !important;
`;
