import { Response } from 'express';

const OK = (res: Response, data: unknown, message = '', success = true) => {
  res.status(200).json({
    success,
    message: message || '',
    result: data || null,
  });
};

const ERROR = (
  res: Response,
  data: unknown,
  message = 'Something went wrong!',
  success = false,
) => {
  res.status(500).json({
    success,
    message: message || '',
    data,
  });
};

export { OK, ERROR };
