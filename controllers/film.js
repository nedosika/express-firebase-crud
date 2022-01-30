import _ from "lodash";
import firestore, {COLLECTIONS} from "../services/Firestore/index.js";

import Film from "../models/Film.js";

const add = async (req, res) => {
    try {
        const data = req.body;

        const film = await firestore.add(COLLECTIONS.films, data);

        res.status(201).send({
            data: {
                film
            },
            status: "added"
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getOne = async (req, res) => {
    try {
        const id = req.params.id;

        const film = await firestore.getDocOne(COLLECTIONS.films, id);

        if (_.isEmpty(film)) {
            res.status(404).send({
                message: "Film not found",
                status: "not found"
            });
        } else {
            res.status(200).send({
                data: new Film(
                    film.id,
                    film.name,
                    film.year,
                    film.rating,
                    film.genre,
                    film.link,
                    film.torrentLink,
                    film.status
                ),
                status: "ok"
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAll = async (req, res) => {
    const films = await firestore.getDocAll(COLLECTIONS.films);

    if (films.length) {
        const response = [];

        films.forEach((film) => {
            response.push(
                new Film(
                    film.id,
                    film.name,
                    film.year,
                    film.rating,
                    film.genre,
                    film.link,
                    film.torrentLink,
                    film.status
                )
            );
        });

        res.status(200).send({
            data: response,
            status: "ok"
        });
    } else {
        res.status(404).send({
            data: {
                message: "films not found "
            },
            status: "not found"
        });
    }
};

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const oldFilm = await firestore.getDocOne(COLLECTIONS.films, id);

        if (_.isEmpty(oldFilm)) {
            res.status(404).send({
                data: {
                    message: "Film not found"
                },
                status: "not found"
            });
            await firestore.update(COLLECTIONS.films, {...oldFilm, ...data});

            res.status(200).send({
                data: {
                    message: "Film updated"
                },
                status: "updated"
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const removedFilm = await firestore.getDocOne(COLLECTIONS.films, id);

        if (_.isEmpty(removedFilm)) {
            res.status(404).send({
                data: {
                    message: "Film not found"
                },
                status: "not found"
            });
        } else {
            await firestore.remove(COLLECTIONS.films, id)

            res.status(200).send({
                data: removedFilm,
                status: "deleted"
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default {
    add,
    getOne,
    getAll,
    update,
    remove
};
