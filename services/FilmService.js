import Firestore from "./Firestore/Firestore.js";
import {COLLECTIONS} from "./Firestore/consts.js";
import UserService from "./UserService.js";

const FilmService = {
    getAll: async (query) => {
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
            .map((film) => ({ ...film, isFavorite: favorites.map((film) => film.id).includes(film.id) }));

        return {
            films: result,
            page,
            limit,
            size: films.length
        };
    }
}
export default FilmService;