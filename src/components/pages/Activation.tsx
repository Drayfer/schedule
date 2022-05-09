import { Button, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PopupError } from '../helpers/PopupError';

const Activation = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkToken = async (id: string) => {
    try {
      const { data } = await axios.get<{ activate: boolean }>(
        `${process.env.REACT_APP_API_URL}/auth/activate/${id}`
      );
      setLoading(false);
      return data;
    } catch (err) {
      PopupError(err);
    }
  };

  useEffect(() => {
    if (id) {
      checkToken(id).then((result) => result?.activate && setIsActivated(true));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      {loading ? (
        <Spin size="large" className="text-white" />
      ) : (
        <>
          <p className="text-3xl">
            {isActivated
              ? 'User successfully activated'
              : 'Activation is wrong'}
          </p>
          <Button
            size="large"
            type="primary"
            onClick={() => navigate('/login')}
          >
            Go to login page
          </Button>
        </>
      )}
    </div>
  );
};

export default Activation;
