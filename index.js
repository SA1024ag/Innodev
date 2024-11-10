const express = require("express");
const { resolve } = require("path");
const dbconnect = require("./dbconnect/dbconnect.js");
const cartRoutes = require("./Routes/cart.js");
const authRoutes = require("./Routes/authRoutes.js");
const cors = require("cors"); // Import cors

dbconnect();  // Ensure database connection is established

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS to allow cross-origin requests from your frontend
app.use(cors());  // Allow all origins; modify if needed for security

// Serve static files (ensure the 'static' folder exists)
app.use(express.static('static'));  // Ensure static assets are served

// Handle GET request to the root path
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));  // Serve the index page
});

// Set up API routes
app.use('/api', cartRoutes);  // Cart-related routes
app.use('/api/auth', authRoutes);  // Authentication-related routes

// Start the server
app.listen(port, () => {
  console.log(`Backend app listening at http://localhost:${port}`);
});
