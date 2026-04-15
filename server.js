const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// COURSES
let courses = [
  {
    title: "Affiliate Marketing",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    title: "Canva Mastery",
    video: "https://www.w3schools.com/html/movie.mp4"
  }
];

// ROUTES
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/courses", (req, res) => {
  res.json(courses);
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});