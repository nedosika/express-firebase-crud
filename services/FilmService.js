import Firestore from "./Firestore/Firestore.js";
import {COLLECTIONS} from "./Firestore/consts.js";
import UserService from "./UserService.js";
import firestore from "./Firestore/Firestore.js";
import _ from "lodash";

const getOne = (id) => firestore.getDocOne(COLLECTIONS.films, id);
const getAll = async (query) => {
    const {
        page = 1,
        limit = 100,
        field = 'name',
        order = 'ASC',
        search = '',
        userId
    } = query;

    const films = await Firestore.getDocAll(COLLECTIONS.films);
    const favorites = await UserService.getFavorites(userId);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = films
        .filter((film) => film.name.includes(search))
        .sort((a, b) =>
            order === 'ASC'
                ? a[field] > b[field] ? 1 : -1
                : a[field] < b[field] ? 1 : -1
        )
        .slice(startIndex, endIndex)
        .map((film) => ({...film, isFavorite: favorites.map((film) => film.id).includes(film.id)}));

    return {
        films: result,
        page,
        limit,
        size: films.length
    };
};
const create = (film) => firestore.add(COLLECTIONS.films, film);
const getAllByQuery = (query) => firestore.getDocsByQuery(COLLECTIONS.films, {
    field: query.field,
    rule: "==",
    value: query.value
});
const update = async (updatedFilm) => {
    const oldFilm = await getOne(updatedFilm.id);

    if (_.isEmpty(oldFilm)) return;

    const newFilm = {...oldFilm, ...updatedFilm};

    await firestore.update(COLLECTIONS.films, newFilm);

    return newFilm;
};
const remove = async (id) => {
    const film = await getOne(id);

    if (_.isEmpty(film)) return {};

    await firestore.remove(COLLECTIONS.films, id);

    return film;
}

export default {
    getOne,
    getAll,
    create,
    getAllByQuery,
    update,
    remove
};