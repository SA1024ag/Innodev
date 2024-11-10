
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbconnect = async () => {
    try {
        const dbURI = process.env.MongoDB_URI;  // MongoDB URI from environment variable
        const db = await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });

        console.log(`MongoDB connected successfully on host: ${db.connection.host}`);

        // Once connection is open, fetch the data
        mongoose.connection.once("open", async () => {
            console.log("Database connection open.");

            // try {
            //     // Access the `food_items` collection from MongoDB
            //     const foodItemsCollection = mongoose.connection.db.collection("food_items");

            //     // Convert the fetched data into an array
            //     const foodItemsArray = await foodItemsCollection.find({}).toArray();

            //     // Display the fetched data in the console
            //     console.log("Fetched Food Items:", foodItemsArray);
            // } catch (error) {
            //     console.error("Error fetching data from food_items:", error);
            // }
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

dbconnect();
module.exports=dbconnect
