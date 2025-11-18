import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { body, validationResult } from 'express-validator';

export const contactValidation = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
  body('phone').trim().isLength({ min: 5, max: 20 }).withMessage('Phone must be between 5 and 20 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').optional().trim().isLength({ max: 1000 }).withMessage('Message must be less than 1000 characters')
];

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ 
        success: false, 
        message: 'Validation errors',
        errors: errors.array() 
      });
      return;
    }

    const { name, phone, email, message } = req.body;

    // Check if phone number already exists
    const existingContact = await Contact.findOne({ phone: phone.trim() });
    if (existingContact) {
      res.status(400).json({ 
        success: false, 
        message: 'Phone number already registered' 
      });
      return;
    }

    const contact = new Contact({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      message: message?.trim()
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact information saved successfully',
      contact
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

export const getContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      contacts
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};