/*
    host + /api/auth
 */

const { Router } = require("express");
const {
    createUser,
    login,
    renewToken,
} = require("../controllers/authController");
const router = Router();
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/field-validator");

router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty().trim(),
        check("email", "Email is required").isEmail().normalizeEmail(),
        check("password","Password is required and must be atleast 6 characters long").isLength({ min: 6 }),
        validateFields,
    ],
    createUser
);

router.post(
    "/",
    [
        check("email", "Email is required").isEmail().normalizeEmail(),
        check("password","Password is required and must be atleast 6 characters long").isLength({ min: 6 }),
        validateFields,
    ],
    login
);

router.get("/renew", renewToken);

module.exports = router;
