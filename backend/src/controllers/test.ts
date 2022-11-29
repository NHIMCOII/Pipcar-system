import { BadRequestError, DataNotFoundError } from '@pippip/pip-system-common';
import { Request, Response } from 'express';
import testService from '../services/test';

const getAllTest = async (req: Request, res: Response) => {
  const test_list = await testService.getAllTest();
  res.send({
    response_status: 1,
    message: 'GET ALL TEST SUCCESS',
    data: {
      test_list,
    },
  });
};

const getTest = async (req: Request, res: Response) => {
  const { input } = req.body;
  let output = 0;
  output = Math.sqrt(input);
  res.send(output);
};
const postTest = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  await testService.postTest(title, content);
  res.send({
    response_status: 1,
    message: 'TEST POST DONE',
  });
};

export default { getAllTest, getTest, postTest };
