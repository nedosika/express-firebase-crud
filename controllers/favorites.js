import UserService from "../services/UserService.js";

const get = async (req, res) => {
  try {
    const {user_id} = req.user;

    const favorites = await UserService.getFavorites(user_id);

    if (favorites.length) {
      res.status(200).send({
        data: favorites,
        status: "ok"
      });
    } else {
      res.status(404).send({
        data: [],
        message: "Favorites not found",
        status: "not found"
      });
    }
  } catch (error) {
    res.status(500).send({
      data: [],
      message: error.message,
      status: "Error"
    });
  }
};

const add = async (req, res) => {
  try {
    const {user_id} = req.user;
    const data = req.body;
    const favorites = await UserService.addFavorite(user_id, data);
    res.status(201).send(favorites);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
      status: "Error"
    });
  }
};

const remove = async (req, res) => {
  try {
    const {user_id} = req.user;
    const { filmId } = req.body;

    await UserService.removeFavorite(user_id, filmId);

    res.status(200).send({
      data: filmId,
      message: "Film deleted from favorites",
      status: "Deleted"
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      status: "Error"
    });
  }
};

export default {
  get,
  add,
  remove
};
