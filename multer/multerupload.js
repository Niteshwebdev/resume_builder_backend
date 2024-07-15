const multer = require("multer");


const template = multer.diskStorage({
    //path to store the Pic
    destination: (req, file, cb) => {
      cb(null, "../images");
    },
  
    
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const templatepdf = multer({ storage: template });

  module.exports = { templatepdf };