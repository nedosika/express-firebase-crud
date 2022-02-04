import User from "../models/User.js";

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const { favorites = [] } = await User.getOne(id);

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
    const userId = req.params.id;
    const data = req.body;
    const favorites = await User.addFilmToFavorites(userId, data);
    res.status(201).send(favorites);
  } catch (error) {
    console.log(error.mesaage);
    res.status(500).send({
      message: error.message,
      status: "Error"
    });
  }
};

const remove = async (req, res) => {
  try {
    const userId = req.params.id;
    const { filmId } = req.body;

    const favorites = await User.removeFilmFromFavorites(userId, filmId);

    res.status(200).send(favorites);
    console.log(userId);
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
