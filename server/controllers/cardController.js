import Card from "../models/Card.js";

// Get all cards
export const getAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get card by ID
export const getCardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new card
export const createCard = async (req, res) => {
    try {
        const card = new Card({ ...req.body, user_id: req.user.id });
        const newCard = await card.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        // Ensure the logged-in user is the owner of the card
        if (!req.user || card.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Update the card
        Object.assign(card, req.body); // מעדכן את השדות לפי הבקשה
        const updatedCard = await card.save(); // שמירה למסד הנתונים
        res.json(updatedCard);
    } catch (error) {
        console.error("Error in updateCard:", error); // הצגת שגיאה במסוף
        res.status(500).json({ message: error.message });
    }
};


// Delete card by ID
export const deleteCard = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        // Ensure the logged-in user is the owner of the card
        if (!req.user || card.user_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Card.findByIdAndDelete(req.params.id);
        res.json({ message: "Card deleted successfully" });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ message: error.message });
    }
};
