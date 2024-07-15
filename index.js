// server.js

const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const { Savepdf } = require('./Api/savepdf'); // Import Savepdf function
const {  FetchPdfs } = require("./Api/fetchpdf");
const { Resumedata } = require("./Api/resumedata");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Replace with your frontend URL
      "http://localhost:3001", // Additional frontend URLs if applicable
      "http://localhost:3002",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Route to handle saving PDF
app.post('/savepdf', Savepdf);
// app.get('/fetchpdf', FetchPdfs);
app.post('/resumedata', Resumedata);

// Start server and connect to MongoDB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
