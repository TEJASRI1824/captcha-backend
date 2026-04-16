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
  name: String,
  earnings: { type: Number, default: 0 }
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.json({ message: "User exists" });

  let newUser = new User({ email, password });
  await newUser.save();

  res.json({ message: "Registered" });
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email, password });
  if (!user) return res.json({ message: "Invalid" });

  res.json({ message: "Success" });
});

// ================= ADD EARNING =================
app.post("/addEarning", async (req, res) => {
  const { email, amount } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  user.earnings += amount;
  await user.save();

  res.json({ earnings: user.earnings });
});

// ================= GET EARNINGS =================
app.post("/getEarnings", async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.json({ earnings: 0 });

  res.json({ earnings: user.earnings });
});

// ================= WITHDRAW =================
app.post("/withdraw", async (req, res) => {
  const { email, amount } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  if (user.earnings < amount) {
    return res.json({ message: "Insufficient balance" });
  }

  user.earnings -= amount;
  await user.save();

  res.json({ message: "Withdraw successful", earnings: user.earnings });
});

// ================= START =================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("🌐 Server running on port " + PORT);
});