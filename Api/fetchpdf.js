// Api/getpdfs.js
const connectDB = require('../database/db');

const FetchPdfs = async (req, res) => {
  try {
    // Connect to MongoDB and fetch PDF data
    const db = await connectDB();
    const collection = db.collection('pdfs'); // Replace 'pdfs' with your collection name

    const pdfs = await collection.find({}).toArray();

    res.status(200).json(pdfs);
  } catch (err) {
    console.error('Failed to fetch PDFs:', err);
    res.status(500).json({ error: 'Failed to fetch PDFs' });
  }
};

module.exports = { FetchPdfs };
