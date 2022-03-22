/*
    host + /api/events
*/
const { Router } = require("express");
const {
    getAllEvents,
    createEvent,
    editEvent,
    deleteEvent,
} = require("../controllers/eventController");
const { validateJWT } = require("../middlewares/renewJWT");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/field-validator");
const { isDate, isValidDate } = require("../helpers/isDate");

const router = Router();

router.use(validateJWT);
//Get all events
router.get("/", getAllEvents);

//Create Event
router.post(
    "/new",
    [
        check("title", "Title is required").not().isEmpty(),
        check("start", "Start date is required").custom(isDate),
        check("end", "End date is required").custom(isDate),
        validateFields,
    ],
    createEvent
);

//Edit Event
router.put("/edit/:id", editEvent);

//delete event
router.delete("/delete/:id", deleteEvent);

module.exports = router;
