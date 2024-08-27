const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const multer = require("multer");
const path = require("path");
const { uploadCSV } = require("../controllers/csvController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store files in the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to register a user
router.post("/register", register);

// Route to login a user
router.post("/login", login);

// Route to upload CSV file
router.post('/api/upload-csv', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      // Process the file
      res.status(201).json({ msg: 'File uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while processing file' });
    }
  });

module.exports = router;
