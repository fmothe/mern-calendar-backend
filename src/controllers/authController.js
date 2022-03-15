const { response, request } = require("express");
const User = require("../models/User");
const encrypt = require("bcryptjs");
const { resolve } = require("path");

const createUser = async (req, res = response) => {
    const { name, email, password } = req.body;

    try {
        //Search the user, if user doesn't exist it instantiate a new user with the data.
        //if the user already exists throws status 400 with err msg.
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists with this email",
            });
        }
        user = new User(req.body);

        //Password encryption
        //Salt generation
        //Hash generation, params = number of iteration it has for encryption, default = 10
        const salt = encrypt.genSaltSync();
        //Generate the hash for the current password with the salt generated above
        user.password = encrypt.hashSync(password, salt);

        await user.save();
        res.status(201).json({
            ok: true,
            user: user.id,
            name: user.name,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "failed", err: "contact an admin" });
    }
};

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "User or password doesn't exist",
            });
        }

        //confirm password for user
        const validPassword = encrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok:true,
                msg: 'Wrong password'
            })
        }

        res.status(201).json({
            ok: true,
            msg: "login",
            uid: user.id,
            name: user.name,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "failed", err: "contact an admin" });
    }
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
