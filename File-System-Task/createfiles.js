const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Define the route to create the text file
app.get('/createTextFile', (req, res) => {
  try {
    // Get the current timestamp
    const currentTimestamp = new Date().getTime();

    // Format the current date-time
    const currentDate = new Date().toISOString().replace(/:/g, '-');
    
    // Create the file content (current timestamp)
    const fileContent = currentTimestamp.toString();

    // Define the file name using the current date-time
    const fileName = `${currentDate}.txt`;

    // Define the folder path where the file will be saved
    const folderPath =  "./newfolder"

    // Create the file path
    const filePath = path.join(folderPath, fileName);

    // Write the content to the file
    fs.writeFileSync(filePath, fileContent);

    // Respond with a success message
    res.status(200).json({ message: 'Text file created successfully' });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the text file' });
  }
});

// Start the server
const port = 3000; // Change this to your desired port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
