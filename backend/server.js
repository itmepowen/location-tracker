const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON request body
app.use(bodyParser.json());

// API to save location data
app.post("/save-location", (req, res) => {
  const { latitude, longitude, accuracy, timestamp } = req.body;
  console.log("coming here ",latitude, longitude, accuracy, timestamp)
  const filePath = path.join(__dirname, "locations.txt");

  const fileContent = `
Timestamp: ${timestamp}
Latitude: ${latitude}
Longitude: ${longitude}
Accuracy: ${accuracy} meters
----------------------------
`;

  fs.appendFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).send("Failed to save location.");
    }
    res.send("Location saved successfully.");
  });
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});