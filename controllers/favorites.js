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
    const id = req.params.id;
    const data = req.body;

    const user = await User.addFilmToFavorites(id, data);

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message,
      status: "Error"
    });
  }
};

const remove = async (req, res) => {
  try {
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
