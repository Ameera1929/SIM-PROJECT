const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying MongoDB Connection...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.error("MongoDB Error Name:", error.name);
    console.error("MongoDB Error Message:", error.message);

  }
};

module.exports = connectDB;