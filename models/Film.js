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

    static async findOne(film) {

    }

    static async create(name, year, rating, genre, link, torrentLink, status){

    }
}

export default Film;