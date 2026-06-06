const express = require('express');
const {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contact.controller');
const { contactRateLimiter } = require('../middleware/rateLimiter.middleware');
const { requireAdminKey } = require('../middleware/auth.middleware');
const {
  contactValidators,
  runContentFilter,
  statusValidator,
  idValidator,
  handleValidationErrors,
} = require('../middleware/validate.middleware');

const router = express.Router();

router.post(
  '/',
  contactRateLimiter,
  contactValidators,
  handleValidationErrors,
  runContentFilter,
  submitContact,
);

router.get('/', requireAdminKey, getAllContacts);
router.patch(
  '/:id/status',
  requireAdminKey,
  idValidator,
  statusValidator,
  handleValidationErrors,
  updateContactStatus,
);
router.delete('/:id', requireAdminKey, idValidator, handleValidationErrors, deleteContact);

module.exports = router;
