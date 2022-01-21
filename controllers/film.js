import db from "../db.js";

import Film from "../models/Film.js"

const add = async (req, res) => {
    try {
        const data = req.body;

        const filmRef = db.collection('films').doc();

        filmRef.set(data).then(() => {
            res.send({
                ...data,
                id: filmRef.id
            });
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAll = (req, res) => {
    return db.collection('films').get()
        .then((snapshot) => {
            if (snapshot.empty) {
                res.status(404).send({message: "films not found", status: 'not found'});
            } else {
                const films = [];

                snapshot.forEach((doc) => {
                    const film = new Film(
                        doc.id,
                        doc.data().name,
                        doc.data().year,
                        doc.data().rating,
                        doc.data().genre,
                        doc.data().link,
                        doc.data().torrentLink,
                        doc.data().status
                    )
                    films.push(film);
                })

                res.status(200).send({data: films, status: 'ok'});
            }
        })
        .catch((err) => {
            res.status(400).send(err.message);
        })
}

const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const film = await db.collection('films').doc(id).get();

        if(!film.exists){
            res.status(404).send({
                message: "student not found",
                status: "not found"
            })
        } else {
            res.send({
                data: film.data(),
                status: "ok"
            })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    add,
    getAll,
    getOne
}