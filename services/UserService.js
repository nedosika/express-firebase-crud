import Firestore from "./Firestore/Firestore.js";
import {COLLECTIONS} from "./Firestore/consts.js";
import _ from "lodash";

const getOne = (id) => Firestore.getDocOne(COLLECTIONS.users, id);

const getOneByToken = async (token) => {
    const result = await Firestore.getDocsByQuery(COLLECTIONS.users, {
        field: "refreshToken",
        rule: "==",
        value: token
    });

    return result.length ? result[0] : null;
}

const getOneByEmail = async (email) => {
    const result = await Firestore.getDocsByQuery(COLLECTIONS.users, {
        field: "email",
        rule: "==",
        value: email.toLowerCase()
    })

    return result.length ? result[0] : null
}

const update = async (updatedUser) => {
    const oldUser = await getOne(updatedUser.id);

    if (_.isEmpty(oldUser)) return;

    const newUser = {...oldUser, ...updatedUser};

    await Firestore.update(COLLECTIONS.users, newUser);

    return newUser;
}

const getFavorites = async (id) => {
    const user = id ? await getOne(id) : null;
    return user?.favorites ? user.favorites : [];
}

const addFavorite = async (userId, film) => {
    const oldUser = await getOne(userId);
    const oldFavorites = oldUser.favorites || [];
    const favorites = [
        ...oldFavorites.filter(({ id }) => id !== film.id),
        film
    ];

    await Firestore.update(COLLECTIONS.users, { ...oldUser, favorites });

    return favorites;
}

const removeFavorite = async (userId, filmId) => {
    const oldUser = await getOne(userId);

    const favorites = oldUser.favorites.filter((film) => film.id !== filmId);

    await Firestore.update(COLLECTIONS.users, { ...oldUser, favorites });

    return favorites;
}

export default {
    getOneByToken,
    getOneByEmail,
    getOne,
    update,
    getFavorites,
    addFavorite,
    removeFavorite
}