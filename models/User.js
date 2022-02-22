import Firestore, { COLLECTIONS } from "../services/Firestore/index.js";
import _ from "lodash";

class User {
  constructor(id, email, password, status, favorites = []) {
    this.id = id;
    this.password = password;
    this.email = email;
    this.status = status;
    this.favorites = favorites;
  }

  static async getOneByEmail(email) {
    const response = await Firestore.getDocsByQuery(COLLECTIONS.users, {
      field: "email",
      rule: "==",
      value: email.toLowerCase()
    });

    return response[0];
  }

  static async getOne(id) {
    return await Firestore.getDocOne(COLLECTIONS.users, id);
  }

  static async findByToken(token) {
    const result = await Firestore.getDocsByQuery(COLLECTIONS.users, {
      field: "token",
      rule: "==",
      value: token
    });

    return result[0];
  }

  static async create({ email, password }) {
    return await Firestore.add(COLLECTIONS.users, { email, password });
  }

  static async update(updatedUser) {
    const oldUser = await User.getOne(updatedUser.id);

    if (_.isEmpty(oldUser)) return;

    const newUser = { ...oldUser, ...updatedUser };

    await Firestore.update(COLLECTIONS.users, newUser);

    return newUser;
  }

  static async addFilmToFavorites(userId, film) {
    const oldUser = await User.getOne(userId);
    const oldFavorites = oldUser.favorites || [];
    const favorites = [
      ...oldFavorites.filter(({ id }) => id !== film.id),
      film
    ];

    await Firestore.update(COLLECTIONS.users, { ...oldUser, favorites });

    return favorites;
  }

  static async removeFilmFromFavorites(userId, filmId) {
    const oldUser = await User.getOne(userId);

    const favorites = oldUser.favorites.filter((film) => film.id !== filmId);

    await Firestore.update(COLLECTIONS.users, { ...oldUser, favorites });

    return favorites;
  }
}

export default User;
