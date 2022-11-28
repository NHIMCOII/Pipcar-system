import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@pippip/pip-system-common';
import testController from '../controllers/test';
const router = express.Router();

router.get(
  '/api/test',
  [
    body('input')
      .isNumeric()
      .notEmpty()
      .withMessage('Input is number required.'),
  ],
  validateRequest,
  testController.getTest
);

export { router as TestRouter };
