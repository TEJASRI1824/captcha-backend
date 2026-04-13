const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = [];

app.post("/register", (req, res) => {
    const { email, password } = req.body;

    let user = users.find(u => u.email === email);
    if (user) return res.json({ message: "User exists" });

    users.push({ email, password, earnings: 0, tasks: 0 });

    res.json({ message: "Registered" });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    let user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.json({ message: "Invalid" });

    res.json({ message: "Success" });
});

app.post("/update", (req, res) => {
    const { email, correct } = req.body;

    let user = users.find(u => u.email === email);
    if (!user) return res.json({ message: "Not found" });

    user.tasks++;
    if (correct) user.earnings++;

    res.json(user);
});

app.get("/users", (req, res) => {
    res.json(users);
});

app.listen(5000, () => console.log("Server running on port 5000"));
