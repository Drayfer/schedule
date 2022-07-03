import React, { useEffect } from 'react';
import { Button, Carousel } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import TeachAppLogo from '../../assets/images/TeachAppLogo.png';
import slideOne from '../../assets/images/firstScreen/1.png';
import slideTwo from '../../assets/images/firstScreen/2.png';
import slideThree from '../../assets/images/firstScreen/3.png';
import slideFour from '../../assets/images/firstScreen/4.png';
import slideFive from '../../assets/images/firstScreen/5.png';
import slideSix from '../../assets/images/firstScreen/6.png';

const FirstPage = () => {
  let navigate = useNavigate();
  const { user } = useAppSelector((state) => state);

  useEffect(() => {
    if (user.data) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Container className="tablet:px-20">
      <div className="flex items-center justify-center mt-2">
        <img src={TeachAppLogo} alt="logo" className="h-16 w-auto mr-4" />
        <div>
          <h1 className="mt-2 font-semibold text-2xl text-slate-300">
            Teacher's App Helper
          </h1>
          <p className="font-semibold text-base text-slate-300 text-center">
            Plan your schedule
          </p>
        </div>
      </div>

      <Carousel autoplay>
        <div>
          <ContentStyle>
            <div>
              <h2 className="text-3xl text-slate-200 font-bold px-10">
                Create and plan your lesson schedule:
              </h2>
              <ul>
                <li>plan your time</li>
                <li>mark completed lessons</li>
                <li>keep track of your work</li>
              </ul>
            </div>
            <img src={slideOne} alt="slide1" />
          </ContentStyle>
        </div>
        <div>
          <ContentStyle>
            <img src={slideTwo} alt="slide1" />
            <div>
              <h2 className="text-3xl text-slate-200 font-bold px-10">
                Add students and control the balance:
              </h2>
              <ul>
                <li>view student information</li>
                <li>assign discipline</li>
                <li>view debt</li>
              </ul>
            </div>
          </ContentStyle>
        </div>
        <div>
          <ContentStyle>
            <div>
              <h2 className="text-3xl text-slate-200 font-bold px-10">
                Add disciplines and distribute students:
              </h2>
              <ul>
                <li>choose labels</li>
                <li>sort students</li>
                <li>plan your workload</li>
              </ul>
            </div>
            <img src={slideThree} alt="slide1" />
          </ContentStyle>
        </div>
        <div>
          <ContentStyle>
            <img src={slideFour} alt="slide1" />
            <div>
              <h2 className="text-3xl text-slate-200 font-bold px-10">
                Control income and intensity statistics:
              </h2>
              <ul>
                <li>know your earnings</li>
                <li>evaluate efficiency</li>
                <li>compare indicators</li>
              </ul>
            </div>
          </ContentStyle>
        </div>
        <div>
          <ContentStyle>
            <div>
              <h2 className="text-3xl text-slate-200 font-bold px-10">
                Get notified about upcoming lessons:
              </h2>
              <ul>
                <li>visual and audio notifications</li>
                <li>don't miss the beginning of the lessons</li>
                <li>set notification time</li>
              </ul>
            </div>
            <img src={slideFive} alt="slide1" />
          </ContentStyle>
        </div>
        <div>
          <ContentStyle>
            <img src={slideSix} alt="slide1" />
            <div>
              <h2 className="text-3xl text-slate-200 font-bold px-10">
                Use the same App on mobile or tablet:
              </h2>
              <ul>
                <li>one App on all devices</li>
                <li>user-friendly interface</li>
                <li>set notification time</li>
              </ul>
            </div>
          </ContentStyle>
        </div>
      </Carousel>
      <Button
        type="primary"
        size="large"
        className="self-center mt-6 mb-3"
        onClick={() => navigate('/login')}
      >
        Start
      </Button>
    </Container>
  );
};

export default FirstPage;

const ContentStyle = styled.div`
  height: 65vh;
  color: #fff;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #364d79;
  img {
    width: auto;
    max-height: 400px;
  }
  ul {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.75rem;
    list-style-type: disc;
    margin-left: 100px;
  }
  @media (max-width: 768px) {
    img {
      height: 0px;
    }
    ul {
      margin-left: 70px;
    }
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #364d79;
  display: flex;
  flex-direction: column;
`;
