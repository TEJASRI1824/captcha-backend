const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

console.log("🚀 Server Starting...");

// ================= MONGODB =================
mongoose.connect("mongodb+srv://admin:admin123@cluster0.1bhhre0.mongodb.net/nirudyogaDB?retryWrites=true&w=majority");

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
    console.log("❌ Mongo Error:", err);
});

// ================= ROOT ROUTE (FIXED) =================
app.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});

// ================= MODEL =================
const User = mongoose.model("User", {
    email: String,
    password: String,
    name: String,
    earnings: { type: Number, default: 0 }
});

// ================= COURSES =================
let courses = [
    {
        title: "Affiliate Marketing",
        video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        title: "YouTube Earning",
        video: "https://www.w3schools.com/html/movie.mp4"
    }
];

// ================= GET COURSES =================
app.get("/courses", (req, res) => {
    res.json(courses);
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.json({ message: "User exists" });
    }

    let newUser = new User({ email, password });
    await newUser.save();

    res.json({ message: "Registered" });
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email, password });

    if (!user) {
        return res.json({ message: "Invalid" });
    }

    res.json({ message: "Success" });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("🌐 Server running on port " + PORT);
});