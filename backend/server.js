const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// COURSES
let courses = [
  {
    title: "Affiliate Marketing",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

// ROUTES
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/courses", (req, res) => {
  res.json(courses);
});

// PORT FIX (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});