const connectDB = require('../database/db');
const assert = require('assert'); 
const validator = require('validator');


async function Resumedata(req, res) {
    try {
        const db = await connectDB();
        const collection = db.collection('resumedata'); // Assuming your collection is 'users'
    
        const { firstname, lastname, email, phone, education, workExperiences, projects, technicalSkills, additionalSections } = req.body;
    
        // Validate email format using a library like validator.js
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: 'Email is required' });
          }
      
          // Validate email format using validator
          if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
          }
      
          // Check if email already exists in the database
          const userExist = await collection.findOne({ email });
          if (userExist) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
          }
      
    
        // Check if email already exists in the database
        
    
        // Insert data into MongoDB collection
        const result = await collection.insertOne({
          firstname,
          lastname,
          email,
          phone,
          education,
          workExperiences,
          projects,
          technicalSkills,
          additionalSections
        });
    
        // Ensure insertion was successful
        assert.equal(result.insertedCount, 1, 'Document insertion failed');
    
        return res.status(200).json({ success: true, message: 'Data inserted successfully' });
      } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return res.status(500).json({ success: false, error: 'Failed to insert data into MongoDB' });
      }
}

module.exports = { Resumedata };
