const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const db = require('../../../models');

const { User, UserLog, UserRole, RoleModule } = db;

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Username and password are required" });

        const user = await User.findOne({ where: { username } });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!user || !isPasswordValid) return res.status(403).json({ error: "Invalid username or password" });

        // Set user ID in the session
        req.session.userId = user.id;
        req.session.username = user.username;

        delete user.password;

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.MY_SECRET,
            { expiresIn: "24h" }
        );
        const userRole = await UserRole.findByPk(user.user_role_id);
        const roleModules = await RoleModule.findAll({ where: { users_role_id: userRole.id } });
        if (!userRole || !roleModules) {
            return res.status(500).json({ error: "Internal Server Error - User role not found" });
        }

        const modules = roleModules.map((module) => module.module);
        await UserLog.create({ user_id: user.id, activity: `User ${username} logged in` });

        res.cookie("token", token, { httpOnly: true });
        res.json({
            data: {
                email: user.email,
                username: user.username,
                role: userRole.role,
                modules: modules,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
