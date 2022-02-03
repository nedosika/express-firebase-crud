import _ from "lodash";

import User from "../models/User.js";

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const film = await User.update({ id, ...data });

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

export default {
  update
};