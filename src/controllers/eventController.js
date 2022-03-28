const { response } = require("express");
const Event = require("../models/Event");
const resolve = require("path");

const getAllEvents = async (req, res = response) => {
    try {
        const eventos = await Event.find().populate("user", "name");

        res.json({
            eventos: eventos,
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error trying to obtain the events please contact an administrator",
        });
    }
};

const createEvent = async (req, res = response) => {
    const newEvent = new Event(req.body);

    try {
        newEvent.user = req.uid;
        const eventoDB = await newEvent.save();
        res.json({
            ok:true,
            event: eventoDB,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error creating a new event please contact an administrator",
        });
    }
};
const editEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                msg: "Event not found",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                msg: "Not authorized",
            });
        }
        const newEvent = {
            ...req.body,
            user: uid,
        };
        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        res.json({
            ok:true,
            evento: eventUpdated,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Please contact an administrator",
        });
    }
};
const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId)
        if(event.user.toString() !== uid){
            return res.status(401).json({
                msg: "Not authorized",
            });
        }

        if(!event){
            return res.status(404).json({
                msg: "Event not found",
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok:true,
            msg: "Event deleted",
            event: event
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg:'Please contact an administrator',
        })
    }
}
module.exports = {
    getAllEvents,
    createEvent,
    editEvent,
    deleteEvent
}
