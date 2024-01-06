const jwt = require("jsonwebtoken");
const express = require('express')
const router = express.Router()


const getUser = async (username) => {
    return { userId: 123, password: "1234", username };
};

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await getUser(username);
        if (!user || user.password !== password) {
            return res.status(403).json({
                error: "Invalid username or password",
            });
        }

        delete user.password;

        const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });

        return res.redirect("/");
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

module.exports = router
