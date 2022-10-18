import { QuestionOutlined } from '@ant-design/icons';
import { Button, Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { localeArray } from '../../assets/constants/lang';
import Slide1 from '../../assets/images/guide/1.png';
import Slide2 from '../../assets/images/guide/2.png';
import Slide3 from '../../assets/images/guide/3.png';
import Slide4 from '../../assets/images/guide/4.png';
import Slide5 from '../../assets/images/guide/5.png';
import Slide6 from '../../assets/images/guide/6.png';
import Slide7 from '../../assets/images/guide/7.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLocale } from '../../store/reducers/OptionsSlice';
import { updateGuide } from '../../store/reducers/UserActions';

const Guide = ({ landing }: { landing?: boolean }) => {
  const { lang, guide, userId, locale } = useAppSelector((state) => ({
    lang: state.options.lang.guide,
    guide: state.user.data?.guide,
    userId: state.user.data?.id,
    locale: state.options.data.locale
  }));

  const carouselRef = useRef<CarouselRef>(null);
  const [count, setCount] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setIsModal(false);
    setCount(0);
    carouselRef?.current?.goTo(0);
  };

  useEffect(() => {
    if (userId && !guide && locale) {
      let localeLang = navigator.language.split('-')[0];
      if (!localeArray.includes(localeLang)) {
        localeLang = 'en';
      }
      dispatch(setLocale({ userId, locale: localeLang }));
      setIsModal(true);
      dispatch(updateGuide(userId));
    }
  }, [guide, userId, locale, dispatch]);

  const GuideContent = (bg?: string, color?: string, stepColor?: string) => {
    const Slide = ({
      img,
      step,
      text
    }: {
      img: string;
      step: number;
      text: string;
    }) => {
      return (
        <div
          style={contentStyle}
          className="flex flex-col justify-start items-center"
        >
          <img
            className={`w-full ${bg && 'rounded-md'}`}
            src={img}
            alt="slide"
          />
          <div
            className={`p-1 rounded-md ${stepColor || 'bg-sky-200'} m-2 px-3`}
          >
            {lang[0]} {step}
          </div>
          <div className="text-center px-4">
            <p>{text}</p>
          </div>
        </div>
      );
    };

    const contentStyle: React.CSSProperties = {
      height: '450px',
      color: color || '#111111',
      background: bg || 'white'
    };

    return (
      <>
        <StyledCarousel ref={carouselRef} afterChange={(e) => setCount(e)}>
          <Slide img={Slide1} step={1} text={lang[1]} />
          <Slide img={Slide2} step={2} text={lang[2]} />
          <Slide img={Slide3} step={3} text={lang[3]} />
          <Slide img={Slide4} step={4} text={lang[4]} />
          <Slide img={Slide5} step={5} text={lang[5]} />
          <Slide img={Slide6} step={6} text={lang[6]} />
          <Slide img={Slide7} step={7} text={lang[7]} />
        </StyledCarousel>
        <div
          className={`flex gap-2 px-2 pb-2 ${
            count === 0 ? 'justify-end' : 'justify-between'
          }`}
        >
          {count !== 0 && count !== 6 && (
            <StyledButton
              className="w-1/2 uppercase"
              onClick={() => {
                setCount((prev) => prev - 1);
                carouselRef?.current?.prev();
              }}
            >
              {lang[8]}
            </StyledButton>
          )}

          {count !== 6 ? (
            <StyledButton
              className="w-1/2 uppercase"
              type="primary"
              onClick={() => {
                setCount((prev) => prev + 1);
                carouselRef?.current?.next();
              }}
            >
              {lang[9]}
            </StyledButton>
          ) : (
            <div className="w-full flex justify-center">
              <StyledButton
                className="w-1/2 uppercase"
                type="primary"
                onClick={handleClose}
              >
                {lang[10]}
              </StyledButton>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      {landing ? (
        <div className="min-w-[350px] max-w-[500px] h-auto mx-auto">
          {GuideContent('#252525', 'white', 'bg-[green]')}
        </div>
      ) : (
        <>
          <div className="absolute top-1 right-28 z-10 w-[36px]">
            <StyledIcon
              className="w-8 h-8 flex bigPhone:inline-flex justify-center items-center rounded-full bg-white cursor-pointer mr-1 mb-1 border-slate-600 border-[1px]"
              onClick={() => setIsModal(true)}
            >
              <QuestionOutlined />
            </StyledIcon>
          </div>
          <StyledModal
            title={'User guide'}
            visible={isModal}
            onCancel={handleClose}
            footer={null}
            centered
          >
            {GuideContent()}
          </StyledModal>
        </>
      )}
    </>
  );
};

export default Guide;

export const StyledIcon = styled.div`
  svg {
    cursor: pointer;
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-header {
    display: none;
  }
  .ant-modal-close-x {
    position: absolute;
    top: -50px;
    right: -10px;
    color: red;
    cursor: pointer;
    svg {
      cursor: pointer;
    }
  }
`;

const StyledCarousel = styled(Carousel)`
  .slick-dots li button {
    background: #363636;
    opacity: 0.4;
  }

  .slick-dots li.slick-active button {
    opacity: 1;
    background: #439af2;
  }
`;

const StyledButton = styled(Button)`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
`;
