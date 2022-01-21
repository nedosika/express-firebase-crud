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
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getAll = (req, res) => db
    .collection('films')
    .get()
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

            res.status(200).send({films, status: 'ok'});
        }
    })
    .catch((err) => {
        res.status(400).send(err.message);
    })


export default {
    add,
    getAll
}