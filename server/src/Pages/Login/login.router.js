const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const db = require('../../../models');

const { User, UserLog, UserRole, RoleModule } = db;

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({ error: "Invalid username or password" });
        }

        delete user.password;

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.MY_SECRET,
            { expiresIn: "1h" }
        );

        const userRole = await UserRole.findByPk(user.user_role_id);

        const roleModules = await RoleModule.findAll({ where: { users_role_id: userRole.id } });

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
        console.error('Error creating log entry:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
