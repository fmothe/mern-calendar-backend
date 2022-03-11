const { response } = require("express");

const createUser = (req, res = response) => {
    console.log(req)
    res.json({
        ok: true,
        msg: "createUser",
    });
};

const login = (req, res = response) => {
    res.json({
        ok: true,
        msg: "login",
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
