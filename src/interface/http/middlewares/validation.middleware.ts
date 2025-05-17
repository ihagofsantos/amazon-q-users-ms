import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(err => err.msg) });
    }
    next();
  }
export const validateCreateUser = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name must be a string')
    .isLength({ min: 5, max: 100 }).withMessage('name must have between 5 and 100 caracters')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage('password is required')
    .escape(),
  handleValidationErrors
];

export const validateUpdateUser = [
  body('name')
    .trim()
    .optional({ nullable: true })
    .isLength({ min: 5, max: 100 }).withMessage('name must have between 5 and 100 caracters')
    .escape(),
  body('email')
    .trim()
    .optional({ nullable: true })
    .isEmail().withMessage('invalid email')
    .normalizeEmail(),
  body('password')
    .custom((value, { req }) => {
      if (value !== undefined) {
        throw new Error('password cannot be informed on this route');
      }
      return true;
    }),
  handleValidationErrors
]
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage('password is required')
    .escape(),
  handleValidationErrors
];