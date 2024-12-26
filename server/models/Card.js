import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
