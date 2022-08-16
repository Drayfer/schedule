import React, { useEffect } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import firstPage from '../../assets/images/firstScreen/firstPage.png';
import AppStore from '../../assets/images/firstScreen/appStore.png';
import GooglePlay from '../../assets/images/firstScreen/googlePlay.png';

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
    <>
      <Container className="tablet:px-20 font-bold">
        <div className="flex relative mt-24">
          <div className="-rotate-90 font-normal leading-[5rem] absolute text-[5rem] border-b-2 left-[-125px] top-[20px] mb-[25px] hidden tablet:block ">
            T-APP
          </div>
          <div className="bigPhone:ml-14 bigPhone:p-0 p-7">
            <p className="font-normal text-5xl mt-[-72px] leading-[3rem]">
              Teacher's App Helper
            </p>
            <ListText className=" border-t-2 pt-9">
              <li>plan lessons and time</li>
              <li>control income and intensity</li>
              <li>get notifications</li>
            </ListText>
            <div className="flex justify-start bigPhone:justify-end">
              <StyledButton
                type="primary"
                size="large"
                className="mt-6 mb-12 w-[200px] font-roboto"
                onClick={() => navigate('/login')}
              >
                Start
              </StyledButton>
            </div>
            <div className="flex mt-8 gap-3 absolute">
              <img
                className="w-[45%] bigPhone:w-full"
                src={AppStore}
                alt="slide1"
              />
              <img
                className="w-[45%] bigPhone:w-full"
                src={GooglePlay}
                alt="slide1"
              />
            </div>
          </div>
        </div>
        <div className="relative hidden bigPhone:block">
          <img
            className="laptop:w-[500px] h-auto top-0 right-0"
            src={firstPage}
            alt="firstPageImg"
          />
        </div>
      </Container>
    </>
  );
};

export default FirstPage;

const Container = styled.div`
  min-height: 100vh;
  background: #252525;
  display: flex;
  color: #fdfdfe;
  justify-content: center;
  align-items: center;
  font-family: 'Rubik Dirt', cursive;
`;

const ListText = styled.ul`
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  line-height: 1.9rem;
  list-style: disc;
  padding-left: 36px;
  font-weight: 300;
`;

const StyledButton = styled(Button)`
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
`;
