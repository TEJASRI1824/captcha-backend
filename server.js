const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

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

app.listen(5000, () => console.log("Server running on port 5000"));
