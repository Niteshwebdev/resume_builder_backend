// Api/savepdf.js
const connectDB = require('../database/db');
const { MongoClient, Binary } = require("mongodb");
const generatePdf = require('./generatePdf');
const { convertPdfToPng } = require('./convertpdftopng');

const Savepdf = async (req, res) => {
  try {
    const { htmlContent } = req.body;

    // Generate PDF from HTML content
    const pdfBuffer = await generatePdf(htmlContent);

    // Convert PDF to PNG (if needed)
    // const pngBuffer = await convertPdfToPng(pdfBuffer);

    // Connect to MongoDB and insert PDF data
    const db = await connectDB();
    const collection = db.collection('pdfs');

    const existpdf = await collection.findOne({ pdfData: new Binary(pdfBuffer) });
    if (existpdf) {
      res.status(400).json({ message: 'PDF already exists' });
      return; // Exit function after sending response
    }

    const result = await collection.insertOne({
      pdfData: new Binary(pdfBuffer),
      // pngData: new Binary(pngBuffer)
    });

    // Set headers to prompt file download
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=resume.pdf');
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error('Failed to save PDF:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to save PDF' });
    }
  }
};

module.exports = { Savepdf };
