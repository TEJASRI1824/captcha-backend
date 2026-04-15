const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// USERS
let users = [];

// COURSES (ADD THIS 🔥)
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

// REGISTER
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    let user = users.find(u => u.email === email);
    if (user) return res.json({ message: "User exists" });

    users.push({
        email,
        password,
        earnings: 0,
        tasks: 0
    });

    res.json({ message: "Registered" });
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.json({ message: "Invalid" });

    res.json({ message: "Success" });
});

// UPDATE CAPTCHA
app.post("/update", (req, res) => {
    const { email, correct } = req.body;

    let user = users.find(u => u.email === email);

    if (!user) return res.json({ message: "Not found" });

    user.tasks++;
    if (correct) user.earnings++;

    res.json(user);
});

// GET USERS
app.get("/users", (req, res) => {
    res.json(users);
});

// 👉 ADD THIS (VERY IMPORTANT)
app.get("/courses", (req, res) => {
    res.json(courses);
});

// PORT FIX FOR RENDER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port " + PORT));