import _ from "lodash";

import firestore, { COLLECTIONS } from "../services/Firestore/index.js";

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

  static getAll = () => firestore.getDocAll(COLLECTIONS.films);

  static update = async (updatedFilm) => {
    const oldFilm = await Film.getOne(updatedFilm.id);

    if (_.isEmpty(oldFilm)) return;

    const newFilm = { ...oldFilm, ...updatedFilm };

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
