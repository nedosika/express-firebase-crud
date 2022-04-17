import _ from "lodash";
import { validationResult }  from 'express-validator';

import FilmService from "../services/FilmService.js";
import TokenService from "../services/TokenService.js";
import {TOKEN_TYPES} from "../config.js";

const add = async (req, res) => {
    try {
        const data = req.body;
        const film = await FilmService.create(data);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                data: Object.assign({}, ...errors.array().map((error) => ({[error.param]: error.msg}))),
                message: "Validation error",
                status: "Validation error"
            });
        }

        return res.status(201).send({
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

        const film = await FilmService.getOne(id);

        if (_.isEmpty(film)) {
            res.status(404).send({
                data: {},
                message: "Film not found",
                status: "not found"
            });
        } else {
            res.status(200).send({
                data: {id, ...film},
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
        const query = req.query;
        const token = req.headers.authorization?.split(" ")[1];

        const auth = await TokenService.validateToken({token, type: TOKEN_TYPES.access});

        console.log(auth)

        const {films, size, page, limit} = await FilmService.getAll({...query, userId: auth?.user_id});

        if (films.length) {
            res
                .status(200).send({
                data: films,
                size,
                count: films.length,
                page,
                limit,
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
        console.log(error)
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

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                data: Object.assign({}, ...errors.array().map((error) => ({[error.param]: error.msg}))),
                message: "Validation error",
                status: "Validation error"
            });
        }

        const film = await FilmService.update({id, ...data});

        if (_.isEmpty(film)) {
            return res.status(404).send({
                data,
                message: "Film not found",
                status: "Not found"
            });
        } else {
            return res.status(200).send({
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
        const film = await FilmService.remove(id);

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

const search = async (req, res) => {
    try {
        const {search} = req.body;
        const films = await FilmService.getAll();
        const searchedFilms = isEmpty(req.body)
            ? films
            : films.filter(
                (film) => film[search.field].toLowerCase().indexOf(search.value.toLowerCase()) > -1
            );

        if (searchedFilms.length) {
            res.status(200).send({
                data: searchedFilms,
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

export default {
    add,
    getOne,
    getAll,
    update,
    remove,
    search
};
