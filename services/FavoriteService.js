import Firestore from "./Firestore/Firestore.js";
import {COLLECTIONS} from "./Firestore/consts.js";
import UserService from "./UserService.js";

const add = async (userId, film) => {
    const oldUser = await UserService.getOne(userId);
    const oldFavorites = oldUser.favorites || [];
    const favorites = [
        ...oldFavorites.filter(({ id }) => id !== film.id),
        film
    ];

    await Firestore.update(COLLECTIONS.users, { ...oldUser, favorites });

    return favorites;
}

const remove = async (userId, filmId) => {
    const oldUser = await UserService.getOne(userId);

    const favorites = oldUser.favorites.filter((film) => film.id !== filmId);

    await Firestore.update(COLLECTIONS.users, { ...oldUser, favorites });

    return favorites;
}

export default {
    add,
    remove
}