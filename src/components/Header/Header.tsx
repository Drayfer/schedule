import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/redux';
import { reset } from '../../store/reducers/UserSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <Row className="h-14 bg-slate-100 sticky top-0 left-0 w-full z-50">
      <Col>
        <div onClick={() => dispatch(reset())}>Log Out</div>
      </Col>
    </Row>
  );
};

export default Header;
