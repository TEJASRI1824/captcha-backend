const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

console.log("🚀 STARTING SERVER...");

const app = express();

app.use(express.json());
app.use(cors());

// ================= MONGODB =================
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.1bhhre0.mongodb.net/nirudyogaDB?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ MongoDB Error:", err);
});

// ================= MODEL =================
const User = mongoose.model("User", {
  email: String,
  password: String,
  name: String
});

// ================= COURSES =================
let courses = [
  {
    title: "Affiliate Marketing",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.json({ message: "User exists" });
    }

    let newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: "Registered" });

  } catch (err) {
    res.json({ message: "Error", error: err.message });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ message: "Invalid" });
    }

    res.json({ message: "Success" });

  } catch (err) {
    res.json({ message: "Error", error: err.message });
  }
});

// ================= SAVE PROFILE =================
app.post("/saveProfile", async (req, res) => {
  try {
    const { email, name } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.name = name;
    await user.save();

    res.json({ message: "Profile saved" });

  } catch (err) {
    res.json({ message: "Error", error: err.message });
  }
});

// ================= COURSES =================
app.get("/courses", (req, res) => {
  res.json(courses);
});

// ================= START =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("🌐 Server running on port " + PORT);
});