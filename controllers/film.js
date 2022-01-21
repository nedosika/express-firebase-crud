import db from "../db.js";

import Film from "../models/Film.js"

const add = async (req, res) => {
    try {
        const data = req.body;
        const filmRef = db.collection('films').doc();

        await filmRef.set(data);

        res.status(201).send({
            data: new Film(
                filmRef.id,
                data.name,
                data.year,
                data.rating,
                data.genre,
                data.link,
                data.torrentLink,
                data.status
            ),
            status: "added"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const filmRef = await db.collection('films').doc(id);
        const doc = await filmRef.get();

        if (!doc.exists) {
            res.status(404).send({
                message: "film not found",
                status: "not found"
            })
        } else {
            res.status(200).send({
                data: new Film(
                    id,
                    doc.data().name,
                    doc.data().year,
                    doc.data().rating,
                    doc.data().genre,
                    doc.data().link,
                    doc.data().torrentLink,
                    doc.data().status
                ),
                status: "ok"
            })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAll = (req, res) => {
    return db.collection('films').get()
        .then((snapshot) => {
            if (snapshot.empty) {
                res.status(404).send({
                    data: {
                        message: "films not found "
                    },
                    status: 'not found'
                });
            } else {
                const films = [];

                snapshot.forEach((doc) => {
                    films.push(new Film(
                        doc.id,
                        doc.data().name,
                        doc.data().year,
                        doc.data().rating,
                        doc.data().genre,
                        doc.data().link,
                        doc.data().torrentLink,
                        doc.data().status
                    ));
                })

                res.status(200).send({
                    data: films,
                    status: 'ok'
                });
            }
        })
        .catch((err) => {
            res.status(400).send(err.message);
        })
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const filmRef = await db.collection('films').doc(id);
        const film = await filmRef.get();

        if (!film.exists) {
            res.status(404).send({
                message: "film not found",
                status: "not found"
            })
        } else {
            await filmRef.update(req.body);

            res.status(200).send({
                data: film.data(),
                status: "updated"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;

        await db.collection('films').doc(id).delete();

        res.status(200).send({
            data: {
                id
            },
            status: "deleted"
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    add,
    getOne,
    getAll,
    update,
    remove
}