const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const db = require('../../../models');
const Users = db.User;
const UsersLog = db.UserLog;

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({
                error: "Invalid username or password",
            });
        }

        delete user.password;

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.MY_SECRET, { expiresIn: "1h" });

        //  UserLog
        await UsersLog.create({ activity: `User ${username} logged in` });

        res.cookie("token", token, { httpOnly: true });
        res.json({ token });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

module.exports = router;
