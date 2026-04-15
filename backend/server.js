const express = require("express");
const cors = require("cors");

const app = express();

// VERY IMPORTANT
app.use(express.json());
app.use(cors());

// DATA
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

// TEST
app.get("/", (req, res) => {
  res.send("Backend working");
});

// GET COURSES
app.get("/courses", (req, res) => {
  res.json(courses);
});

// POST COURSE (FIXED)
app.post("/courses", (req, res) => {
  console.log("Incoming:", req.body);

  const { title, video } = req.body;

  if (!title || !video) {
    return res.status(400).json({ message: "Missing data" });
  }

  courses.push({ title, video });

  res.json({ message: "Course added successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
