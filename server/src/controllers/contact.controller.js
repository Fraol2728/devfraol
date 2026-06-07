const Contact = require('../models/Contact.model');

const MAX_LIMIT = 100;

const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return res.status(201).json({
      success: true,
      message: "Message received. I'll get back to you soon.",
      id: contact._id,
    });
  } catch (err) {
    next(err);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const { status, page = 1 } = req.query;
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), MAX_LIMIT);
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: contacts,
      pagination: {
        page: Number(page),
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true },
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    return res.json({ success: true, data: contact });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    return res.json({ success: true, message: 'Contact deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact, getAllContacts, updateContactStatus, deleteContact };
