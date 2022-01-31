import _ from "lodash";

import Film from "../models/Film.js";

const add = async (req, res) => {
    try {
        const data = req.body;
        const {
            name,
            year,
            rating,
            genre,
            link,
            torrentLink,
            status
        } = data;

        const film = await Film.create({
            name,
            year,
            rating,
            genre,
            link,
            torrentLink,
            status
        });

        res.status(201).send({
            data: film,
            message: "Film added",
            status: "Added"
        });
    } catch (error) {
        res.status(500).send({
            data: {},
            message: error.message,
            status: "Error"
        });
    }
};

const getOne = async (req, res) => {
    try {
        const id = req.params.id;

        const film = await Film.getOne(id);

        if (_.isEmpty(film)) {
            res.status(404).send({
                data: {},
                message: "Film not found",
                status: "not found"
            });
        } else {
            res.status(200).send({
                data: film,
                status: "ok"
            });
        }
    } catch (error) {
        res.status(500).send({
            data: {},
            message: error.message,
            status: "Error"
        });
    }
};

const getAll = async (req, res) => {
    try {
        const films = await Film.getAll();

        if (films.length) {
            res.status(200).send({
                data: films,
                message: "",
                status: "ok"
            });
        } else {
            res.status(404).send({
                data: {},
                message: "Films not found",
                status: "Not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            data: {},
            message: error.message,
            status: "Error"
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const film = Film.update({id, ...data});

        if (_.isEmpty(film)) {
            res.status(404).send({
                data,
                message: "Film not found",
                status: "Not found"
            });
        } else {
            res.status(200).send({
                data: film,
                message: "Film updated",
                status: "Updated"
            });
        }
    } catch (error) {
        res.status(500).send({
            data: {},
            message: error.message,
            status: "Error"
        });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const film = await Film.remove(id);

        if (_.isEmpty(film)) {
            res.status(404).send({
                data: {id},
                message: "Film not found",
                status: "Not found"
            });
        } else {
            res.status(200).send({
                data: film,
                message: "Film removed",
                status: "Removed"
            });
        }
    } catch (error) {
        res.status(500).send({
            data: {},
            message: error.message,
            status: "Error"
        });
    }
};

export default {
    add,
    getOne,
    getAll,
    update,
    remove
};
