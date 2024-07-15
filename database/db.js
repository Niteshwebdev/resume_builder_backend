// database/db.js

const { MongoClient } = require("mongodb");

const connectDB = async () => {
  const dbUrl = "mongodb+srv://mangodbms:vikaash123@vikashcluster.8nm3s.mongodb.net/resume_builder";
  try {
    const client = await MongoClient.connect(dbUrl);
    console.log("DB Connected");
    return client.db(); // Return the database object
  } catch (error) {
    console.error("DB connection Error:", error);
    throw error;
  }
};

module.exports = connectDB;
