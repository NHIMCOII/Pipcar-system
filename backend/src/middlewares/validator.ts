import { body, query,param } from "express-validator";

import { BadRequestError } from "@pippip/pip-system-common";
import { Types } from "mongoose";

const userAccount = [
  body('phone')
    .exists()
    .withMessage('Phone is required')
    .trim()
    .isMobilePhone(['vi-VN'])
    .withMessage('Invalid phone number'),
  body('name')
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isAlpha("vi-VN", { ignore: " " })
    .withMessage("Name must not contains special characters"),
  body("password")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isAlphanumeric()
    .withMessage('Password must not contains special characters'),
  body('role').isIn(['ADMIN', 'PM', 'ANALYST']).withMessage('Invalid role'),
];

const loginPassword = [
  body('phone')
    .exists()
    .withMessage('Phone is required')
    .trim()
    .isMobilePhone(['vi-VN'])
    .withMessage('Invalid phone number'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isAlphanumeric()
    .withMessage('Password must not contains special characters'),
  body('role').isIn(['ADMIN', 'PM', 'ANALYST']).withMessage('Invalid role'),
];

const refreshToken = [
  body('refresh_token')
    .exists()
    .withMessage('Refresh Token is required')
    .custom((value) => {
      if (value == 'EMPTY') {
        throw new BadRequestError('Invalid Token');
      }
      return true;
    }),
];

const objectId = [
  param('id').isMongoId().withMessage('Invalid ObjectId')
]


export default { userAccount, loginPassword, refreshToken,objectId };
