const { response, request } = require("express");
const {validationResult} = require('express-validator');


const createUser = (req, res = response) => {
    const { name, email, password } = req.body;


    res.status(201).json({
        ok: true,
        msg: "createUser",
        user: {
            name,
            email,
            password,
        },
    });
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
