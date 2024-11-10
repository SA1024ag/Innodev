const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();

// Add item to cart
router.post('/add-to-cart', async (req, res) => {
    const { itemId, name, price } = req.body;
    try {
        // Check if item already exists in cart
        let cartItem = await Cart.findOne({ itemId });
        if (cartItem) {
            // If item exists, increase quantity
            cartItem.quantity += 1;
        } else {
            // Otherwise, create a new cart item
            cartItem = new Cart({ itemId, name, price });
        }
        await cartItem.save();
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

// Get cart items
router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});

module.exports = router; // Corrected the syntax error here
