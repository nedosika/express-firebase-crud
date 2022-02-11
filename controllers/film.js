import _ from "lodash";

import Film from "../models/Film.js";

const add = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const film = await Film.create(data);

    res.status(201).send({
      data: film,
      message: "Film added",
      status: "Added"
    });
  } catch (error) {
    res.status(500).send({
      data: {},
      message: error.message,
      status: "Error"
    });
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id;

    const film = await Film.getOne(id);

    if (_.isEmpty(film)) {
      res.status(404).send({
        data: {},
        message: "Film not found",
        status: "not found"
      });
    } else {
      res.status(200).send({
        data: { id, ...film },
        status: "ok"
      });
    }
  } catch (error) {
    res.status(500).send({
      data: {},
      message: error.message,
      status: "Error"
    });
  }
};

const getAll = async (req, res) => {
  try {
    const query = req.query;

    const { films, size, page, limit } = await Film.getAll(query);

    if (films.length) {
      res.status(200).send({
        data: films,
        size,
        count: films.length,
        page,
        limit,
        message: "test",
        status: "ok"
      });
    } else {
      res.status(404).send({
        data: {},
        message: "Films not found",
        status: "Not found"
      });
    }
  } catch (error) {
    res.status(500).send({
      data: {},
      message: error.message,
      status: "Error"
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const film = await Film.update({ id, ...data });

    if (_.isEmpty(film)) {
      res.status(404).send({
        data,
        message: "Film not found",
        status: "Not found"
      });
    } else {
      res.status(200).send({
        data: film,
        message: "Film updated",
        status: "Updated"
      });
    }
  } catch (error) {
    res.status(500).send({
      data: {},
      message: error.message,
      status: "Error"
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const film = await Film.remove(id);

    if (_.isEmpty(film)) {
      res.status(404).send({
        data: { id },
        message: "Film not found",
        status: "Not found"
      });
    } else {
      res.status(200).send({
        data: film,
        message: "Film removed",
        status: "Removed"
      });
    }
  } catch (error) {
    res.status(500).send({
      data: {},
      message: error.message,
      status: "Error"
    });
  }
};

const search = async (req, res) => {
  try {
    const { field, value } = req.body;
    //const films = await Film.getAllByQuery({ field, value });
    const films = await Film.getAll();
    const searchedFilms = _.isEmpty(req.body)
      ? films
      : films.filter(
          (film) => film[field].toLowerCase().indexOf(value.toLowerCase()) > -1
        );

    if (searchedFilms.length) {
      res.status(200).send({
        data: searchedFilms,
        message: "",
        status: "ok"
      });
    } else {
      res.status(404).send({
        data: {},
        message: "Films not found",
        status: "Not found"
      });
    }
  } catch (error) {
    res.status(500).send({
      data: {},
      message: error.message,
      status: "Error"
    });
  }
};

export default {
  add,
  getOne,
  getAll,
  update,
  remove,
  search
};
