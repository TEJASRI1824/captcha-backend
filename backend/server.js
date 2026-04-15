const express = require("express");
const cors = require("cors");

const app = express();

// IMPORTANT
app.use(express.json());
app.use(cors());

let courses = [
  {
    title: "Affiliate Marketing",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working");
});

// GET COURSES
app.get("/courses", (req, res) => {
  res.json(courses);
});

// POST COURSES (THIS FIXES YOUR ERROR)
app.post("/courses", (req, res) => {
  const { title, video } = req.body;

  if (!title || !video) {
    return res.status(400).json({ message: "Missing data" });
  }

  courses.push({ title, video });

  res.json({ message: "Added successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});