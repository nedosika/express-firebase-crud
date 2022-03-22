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

    static getOne = (id) => firestore.getDocOne(COLLECTIONS.films, id);

    static create = (film) => firestore.add(COLLECTIONS.films, film);

    static getAll = async (query) => {
        const films = await firestore.getDocAll(COLLECTIONS.films);

        const {
            page = 1,
            limit = 100,
            field = 'name',
            order = 'ASC',
            search = ''
        } = query;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = films
            .filter((film) => film.name.includes(search))
            .sort((a, b) =>
                order === 'ASC'
                    ? a[field] > b[field] ? 1 : -1
                    : a[field] < b[field] ? 1 : -1
            )
            .slice(startIndex, endIndex);


        return {
            films: result,
            page,
            limit,
            size: films.length
        };
    };

    static getAllByQuery = (query) => firestore.getDocsByQuery(COLLECTIONS.films, {
        field: query.field,
        rule: "==",
        value: query.value
    });

    static update = async (updatedFilm) => {
        const oldFilm = await Film.getOne(updatedFilm.id);

        if (_.isEmpty(oldFilm)) return;

        const newFilm = {...oldFilm, ...updatedFilm};

        await firestore.update(COLLECTIONS.films, newFilm);

        return newFilm;
    };

    static remove = async (id) => {
        const film = await Film.getOne(id);

        if (_.isEmpty(film)) return {};

        await firestore.remove(COLLECTIONS.films, id);

        return film;
    };
}

export default Film;
