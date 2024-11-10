// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 12344455;

exports.signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;
    
        // Validate if all required fields are provided
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Name, email, and password are required' });
        }
    
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds for bcrypt
    
        // Create a new user with the hashed password
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
    
        // Respond with success
        res.status(201).json({
          message: 'User created successfully',
          user: { name, email }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Validate input
        if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
        }
    
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          console.log("User not found with email:", email); // Debugging log
          return res.status(401).json({ message: 'user' });
        }
    
        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "password mismatch"})
        }
        console.log("successfully signed in")
    
    
        // Respond with success if credentials are valid
        res.status(200).json({
          message: 'Sign-in successful',
          user: { name: user.name, email: user.email }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error',error });
      }
};
