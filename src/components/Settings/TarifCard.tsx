import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CheckCircleFilled, LikeTwoTone } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TarifCard = () => {
  const { lang } = useAppSelector((state) => ({
    lang: state.landing.lang || state.options.lang
  }));
  const mainPage = window.location.pathname === '/';

  const navigate = useNavigate();

  const handleClick = (count: number) => {
    if (mainPage) {
      navigate('/login');
      return;
    }
    count === 2 && console.log(count);
    count === 3 && console.log(count);
  };

  return (
    <>
      <div className="flex justify-center w-full flex-wrap gap-4">
        <div className="min-w-[300px] w-[300px] bg-slate-50 rounded-md">
          <div className="bg-orange-400 font-semibold text-2xl text-white text-center p-2 rounded-t-md uppercase font-mono">
            {lang.price[0]}
          </div>
          <div className="p-4 pb-0 border-b-2 text-center uppercase">
            <p className="text-lg mb-2">{lang.price[1]}</p>
            <p className="text-3xl m-0 font-extrabold text-sky-600">
              {lang.price[2]}
            </p>
            <p className="text-sky-700 font-semibold">{lang.price[3]}</p>
          </div>
          <div className="p-3 border-b-2 text-center">
            <div>{lang.price[4]}</div>
            <div className="font-light text-xs">{lang.price[5]}</div>
          </div>
          <div className="p-4 border-b-2 pb-[11px]">
            <Point>
              <Check /> {lang.price[6]}
            </Point>
            <Point>
              <Check /> {lang.price[7]}
            </Point>
            <Point>
              <Check /> {lang.price[8]}
            </Point>
            <Point>
              <Check /> {lang.price[9]}
            </Point>
          </div>
          <div className="p-3 flex justify-center items-center">
            <div
              className={`rounded-md  text-white inline p-2 ${
                mainPage
                  ? 'bg-sky-400 cursor-pointer'
                  : 'border-2 border-red-400 text-slate-800'
              }`}
              onClick={() => handleClick(1)}
            >
              {mainPage ? (
                <span className="font-bold">Регистрация</span>
              ) : (
                <>
                  {lang.price[10]}{' '}
                  <span className="font-semibold">30 {lang.price[11]}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-[300px] w-[300px] bg-slate-50 rounded-md">
          <div className="bg-green-400 font-semibold text-2xl text-white text-center p-2 rounded-t-md uppercase">
            {lang.price[12]}
          </div>
          <div className="p-4 pb-0 border-b-2 text-center uppercase">
            <p className="text-lg mb-2">{lang.price[13]}</p>
            <p className="text-4xl m-0 font-extrabold text-gray-600">$2</p>
            <p className="text-sky-700 font-semibold">{lang.price[14]}</p>
          </div>
          <div className="p-3 border-b-2 text-center">
            <div>{lang.price[15]}</div>
            <div>{lang.price[16]}</div>
          </div>
          <div className="p-4 border-b-2">
            <Point>
              <Check /> {lang.price[17]}
            </Point>
            <Point>
              <Check /> {lang.price[18]}
            </Point>
            <Point>
              <Check /> {lang.price[19]}
            </Point>
            <Point>
              <Check /> {lang.price[20]}
            </Point>
            <Point>
              <Check /> {lang.price[21]}
            </Point>
          </div>
          <div className="p-3 flex justify-center items-center">
            <div
              className="rounded-md bg-sky-400 text-white inline p-2 font-bold cursor-pointer"
              onClick={() => handleClick(2)}
            >
              {mainPage ? 'Регистрация' : lang.price[22]}
            </div>
          </div>
        </div>

        <div className="min-w-[300px] w-[300px] bg-slate-50 rounded-md">
          <div className="bg-sky-400 font-semibold text-2xl text-white text-center p-2 rounded-t-md uppercase">
            {lang.price[23]}
          </div>
          <div className="p-4 pb-0 border-b-2 text-center uppercase">
            <p className="text-lg mb-2">{lang.price[24]}</p>
            <p className="text-4xl m-0 font-extrabold text-gray-600">$12</p>
            <p className="text-sky-700 font-semibold">{lang.price[25]}</p>
          </div>
          <div className="p-3 border-b-2 text-center">
            <div className="mx-auto">
              <div className="p-3 bg-red-600 text-white font-semibold inline-block rounded-xl">
                {lang.price[26]} <b>40%</b>
              </div>
            </div>
          </div>
          <div className="p-4 border-b-2">
            <Point>
              <Check /> {lang.price[27]}
            </Point>
            <Point>
              <Check /> {lang.price[28]}
            </Point>
            <Point>
              <Check /> {lang.price[29]}
            </Point>
            <Point>
              <Check /> {lang.price[30]}
            </Point>
            <Point>
              <Check /> {lang.price[31]}
            </Point>
          </div>
          <div className="p-3 flex justify-center items-center">
            <div
              className="rounded-md bg-sky-400 text-white inline p-2 font-bold cursor-pointer"
              onClick={() => handleClick(3)}
            >
              {mainPage ? 'Регистрация' : lang.price[32]}
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 pt-4 flex justify-center mt-10">
        <div className="w-4/6 bg-slate-50 p-4 min-w-[300px]">
          <p>Нужна помощь?</p>
          <p>
            Служба поддержки T-app поможет с каждым вопросом по оплате и
            использованию платформы
          </p>
          <p>test@test.com</p>
          <p>@t-app</p>
        </div>
      </div>
    </>
  );
};

export default TarifCard;

const Check = styled(CheckCircleFilled)`
  color: green;
  margin-right: 5px;
`;

const Point = styled('p')`
  line-height: 5px;
  font-size: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;
