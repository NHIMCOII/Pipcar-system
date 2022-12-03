import { body, query } from "express-validator";
import config from "config";

const account = [
  body("phone")
    .exists()
    .withMessage("Phone is required")
    .trim()
    .isMobilePhone(["vi-VN"])
    .withMessage("Invalid phone number"),
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isAlpha("vi-VN", { ignore: " " })
    .withMessage("Name must not contains special characters"),
  body("password")
    .default(config.get("default.password"))
    .trim()
    .isLength({ min: config.get("length.password") })
    .withMessage("Password must be at least 8 characters long")
    .isAlphanumeric()
    .withMessage("Password must not contains special characters"),
  body("role")
    .isIn(["Admin", "Partner Manager", "Analyst"])
    .withMessage("Invalid role"),
];

const loginPassword = [
  body("phone")
    .exists()
    .withMessage("Phone is required")
    .trim()
    .isMobilePhone(["vi-VN"])
    .withMessage("Invalid phone number"),
  body("password")
    .trim()
    .isLength({ min: config.get("length.password") })
    .withMessage("Password must be at least 8 characters long")
    .isAlphanumeric()
    .withMessage("Password must not contains special characters"),
  body("role")
    .isIn(["Admin", "Partner Manager", "Analyst"])
    .withMessage("Invalid role"),
];

export default { account, loginPassword };
