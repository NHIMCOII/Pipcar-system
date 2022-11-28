import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@pippip/pip-system-common';
import testController from '../controllers/test';
const router = express.Router();

router.get('/api/test', testController.getAllTest);
router.get(
  '/api/test_input',
  [
    body('input')
      .isNumeric()
      .notEmpty()
      .withMessage('input is number required.'),
  ],
  validateRequest,
  testController.getTest
);
router.post(
  '/api/test',
  [
    body('title').isAlpha().notEmpty().withMessage('title is number required.'),
    body('content')
      .isAlpha()
      .notEmpty()
      .withMessage('content is number required.'),
  ],
  validateRequest,
  testController.postTest
);

export { router as TestRouter };
