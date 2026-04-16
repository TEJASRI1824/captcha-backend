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