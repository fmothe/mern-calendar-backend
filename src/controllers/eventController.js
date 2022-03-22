const { response } = require("express");
const Event = require("../models/Event");
const resolve = require("path");

const getAllEvents = async (req, res = response) => {
    res.json({
        ok: true,
        msg: "getAllevents",
    });
};

const createEvent = async (req, res = response) => {
    const newEvent = new Event(req.body);

    try {
        newEvent.user = req.uid
        const eventoDB = await newEvent.save()
        res.json({
            event: eventoDB
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error creating a new event please contact an administrator",
        });
    }
};
const editEvent = async (req, res = response) => {
    res.json({
        ok: true,
        msg: "editEvent",
    });
};
const deleteEvent = async (req, res = response) => {
    res.json({
        ok: true,
        msg: "deleteEvent",
    });
};

module.exports = {
    getAllEvents,
    createEvent,
    editEvent,
    deleteEvent,
};
