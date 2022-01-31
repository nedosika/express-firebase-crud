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

    static getOne = ({id}) =>
        firestore.getDocOne(COLLECTIONS.films, id)

    static create = (film) =>
        firestore.add(COLLECTIONS.films, film);

    static getAll = () =>
        firestore.getDocAll(COLLECTIONS.films);
}

export default Film;