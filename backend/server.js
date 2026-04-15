console.log("NEW VERSION RUNNING");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ================= DATA =================
let courses = [
  {
    title: "Affiliate Marketing",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

let users = [];

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("Backend working");
});

// ================= COURSES =================
app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/courses", (req, res) => {
  const { title, video } = req.body;

  if (!title || !video) {
    return res.status(400).json({ message: "Missing data" });
  }

  courses.push({ title, video });

  res.json({ message: "Added successfully" });
});

// ================= REGISTER =================
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  let user = users.find(u => u.email === email);

  if (user) {
    return res.json({ message: "User exists" });
  }

  users.push({ email, password });

  res.json({ message: "Registered" });
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.json({ message: "Invalid" });
  }

  res.json({ message: "Success" });
});

// ================= START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});