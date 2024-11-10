// controllers/cartController.js
const Cart = require('../models/cart');

exports.addToCart = async (req, res) => {
  const { itemId, name, price } = req.body;
  const userId = req.user.userId;

  try {
    let cartItem = await Cart.findOne({ userId, itemId });
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new Cart({ userId, itemId, name, price });
    }
    await cartItem.save();
    res.json({ message: 'Item added to cart successfully', cartItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

exports.getCartItems = async (req, res) => {
  const userId = req.user.userId;

  try {
    const cartItems = await Cart.find({ userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};
