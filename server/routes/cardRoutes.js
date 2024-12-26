import express from 'express';
import Joi from 'joi';
import { getAllCards, getCardById, createCard, updateCard, deleteCard } from '../controllers/cardController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// Validation schema
const cardSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    cardNumber: Joi.number().required(),
    imageUrl: Joi.string().required(),
});

// Middleware for validation
const validateCard = (req, res, next) => {
    const { error } = cardSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Route Definitions
router.get('/', authenticate, getAllCards); // Secure all routes with authenticate middleware
router.get('/:id', authenticate, getCardById);
router.post('/', authenticate, validateCard, createCard);
router.put('/:id', authenticate, validateCard, updateCard);
router.delete('/:id', authenticate, deleteCard);

export default router;
