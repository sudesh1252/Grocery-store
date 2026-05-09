// Database Configuration
// This file handles MongoDB connection

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
