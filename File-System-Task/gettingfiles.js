const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Change this to your desired port

// Define the folder path where files are stored
const folderPath = path.join(__dirname, "./newfolder"); // Change 'uploads' to your folder name

// API endpoint to list files in the folder
app.get('/gettingfiles', (req, res) => {
  try {
    // Read the files in the folder
    const files = fs.readdirSync(folderPath);

    // Respond with the list of files
    res.json({ files });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while listing files' });
  }
});

// API endpoint to serve individual files
app.get('/gettingfiles/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(folderPath, filename);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    // File not found
    res.status(404).json({ error: 'File not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
