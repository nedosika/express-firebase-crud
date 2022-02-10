import Film from "../models/Film.js";

const get = async (req, res) => {
  try {
    const { field, value } = req.query;
    //const films = await Film.getAllByQuery({ field, value });
    //console.log(field, value);
    console.log(req.query);
    const result = await Film.getAll();
    const films = result
      .map((film) => film[field])
      .filter((film) => film.toLowerCase().indexOf(value.toLowerCase()) > -1);

    if (films.length) {
      res.status(200).send({
        data: films,
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

export default {
  get
};
