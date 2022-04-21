import React from 'react';
import { Button, Carousel } from 'antd';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const FirstPage = () => {
  let navigate = useNavigate();
  return (
    <Container>
      <Carousel autoplay>
        <div>
          <ContentStyle>1</ContentStyle>
        </div>
        <div>
          <ContentStyle>2</ContentStyle>
        </div>
        <div>
          <ContentStyle>3</ContentStyle>
        </div>
        <div>
          <ContentStyle>4</ContentStyle>
        </div>
      </Carousel>
      <Button
        type="primary"
        size="large"
        className="self-center mt-10"
        onClick={() => navigate('/login')}
      >
        Начать
      </Button>
    </Container>
  );
};

export default FirstPage;

const ContentStyle = styled.h3`
  height: 75vh;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #364d79;
`;

const Container = styled.div`
  height: 100vh;
  background: #364d79;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
