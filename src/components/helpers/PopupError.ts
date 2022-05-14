import { notification } from 'antd';
import axios from 'axios';
import { AxiosErr } from '../../types/types';

export const PopupError = (err: any) => {
  if (axios.isAxiosError(err) && err.response) {
    return notification[`error`]({
      message: 'Error',
      description: (err.response?.data as AxiosErr).message
    });
  } else if (typeof err === 'string') {
    return notification[`error`]({
      message: 'Error',
      description: err
    });
  } else if (err instanceof Error && typeof err.message === 'string') {
    return notification[`error`]({
      message: 'Error',
      description: err.message
    });
  } else if (typeof err === 'object' && err instanceof Error) {
    if (
      JSON.parse(err.message).message &&
      typeof JSON.parse(err.message).message === 'string'
    ) {
      return notification[`error`]({
        message: 'Error',
        description: JSON.parse(err.message).message
      });
    } else {
      const errorMessage = JSON.parse(err.message).join(', ');
      return notification[`error`]({
        message: 'Error',
        description: errorMessage
      });
    }
  }
};

export const isErrorDispatch = async (func: any) => {
  const resp = await func;
  if (resp.hasOwnProperty('error')) {
    throw new Error(JSON.stringify(resp.payload));
  } else {
    return resp;
  }
};
