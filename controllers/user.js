import _ from "lodash";
import UserService from "../services/UserService.js";

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const film = await UserService.update({ id, ...data });

    if (_.isEmpty(film)) {
      res.status(404).send({
        data,
        message: "User not found",
        status: "Not found"
      });
    } else {
      res.status(200).send({
        data: film,
        message: "User updated",
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

const getOne = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserService.getOne(id);

    if (_.isEmpty(user)) {
      res.status(404).send({
        data: {},
        message: "User not found",
        status: "not found"
      });
    } else {
      res.status(200).send({
        data: { id, ...user },
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

export default {
  update,
  getOne
};
