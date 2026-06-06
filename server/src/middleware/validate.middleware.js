const { body, param, validationResult } = require('express-validator');
const { filterContact } = require('../utils/contentFilter');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const runContentFilter = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = filterContact({ name, email, subject, message });
  if (errors.length > 0) {
    return res.status(422).json({ success: false, errors });
  }
  next();
};

const contactValidators = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .customSanitizer((email) => {
      const [localPart, domain] = email.toLowerCase().split('@');
      if (domain === 'gmail.com') {
        const plusIndex = localPart.indexOf('+');
        return plusIndex !== -1
          ? `${localPart.substring(0, plusIndex)}@${domain}`
          : `${localPart}@${domain}`;
      }
      return email.toLowerCase();
    })
    .isEmail()
    .withMessage('Valid email is required'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 200 })
    .withMessage('Subject max 200 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be 10-5000 characters'),
];

const statusValidator = [
  body('status')
    .isIn(['unread', 'read', 'replied'])
    .withMessage('Status must be unread, read, or replied'),
];

const idValidator = [param('id').isMongoId().withMessage('Invalid ID format')];

module.exports = {
  handleValidationErrors,
  runContentFilter,
  contactValidators,
  statusValidator,
  idValidator,
};
