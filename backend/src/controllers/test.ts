import { BadRequestError, DataNotFoundError } from '@pippip/pip-system-common';
import { Request, Response } from 'express';

const getTest = async (req: Request, res: Response) => {
  const { input } = req.body;
  if (input <= 0) {
    throw new BadRequestError('Input must be positive');
  } else {
    const rand = Math.random();
    const output = input * rand;
    if (output < 1) {
      throw new DataNotFoundError();
    } else {
      res.send({
        response_status: 1,
        message: 'TEST DONE',
        data: { output },
      });
    }
  }
};
const postTest = async (req: Request, res: Response) => {};

export default { getTest, postTest };
