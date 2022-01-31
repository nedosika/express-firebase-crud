import _ from "lodash";

import firestore, {COLLECTIONS} from "../services/Firestore/index.js";

class Film {
    constructor(id, name, year, rating, genre, link, torrentLink, status) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.rating = rating;
        this.genre = genre;
        this.link = link;
        this.torrentLink = torrentLink;
        this.status = status;
    }

    static getOne = (id) =>
        firestore.getDocOne(COLLECTIONS.films, id);

    static create = (film) =>
        firestore.add(COLLECTIONS.films, film);

    static getAll = async () => {
        const snapshot = await firestore.getDocAll(COLLECTIONS.films);
        const films = [];

        snapshot.forEach((film) => {
            film.push(
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

        return films;
    }

    static update = async (updatedFilm) => {
        const oldFilm = await Film.getOne(updatedFilm.id);

        if(_.isEmpty(oldFilm)){
            return {}
        }

        const newFilm = {...oldFilm, ...updatedFilm};

        await firestore.update(COLLECTIONS.films, newFilm);

        return newFilm;
    }

    static remove = async (id) => {
        const film = Film.getOne(id);

        if(_.isEmpty(film))
            return {};

        await Film.update(film);

        return film;
    }
}

export default Film;