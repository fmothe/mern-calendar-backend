const { response, request } = require("express");
const User = require("../models/User");

const createUser = async (req, res = response) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists with this email",
            });
        }
        user = new User(req.body)
        await user.save();
        res.status(201).json({
            ok: true,
            user: user.id,
            name: user.name
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "failed", err: "contact an admin" });
    }
};

const login = (req, res = response) => {
    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: "login",
        email,
        password,
    });
};

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renewToken",
    });
};

module.exports = {
    createUser,
    login,
    renewToken,
};
