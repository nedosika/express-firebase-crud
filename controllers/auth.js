import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

import config from "../config.js";

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send({
        message: "All input is required",
        status: "Required"
      });
    }

    const user = await User.getOne(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user.id, email }, config.jwtTokenKey, {
        expiresIn: "2h"
      });
      console.log(user);
      return res.status(200).send({
        data: {
          ...user,
          token
        },
        status: "OK"
      });
    }

    res.status(400).send({
      message: "Invalid Credentials",
      status: "Invalid"
    });
  } catch (error) {
    console.log(error.message);
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send({
        message: "All input is required",
        status: "Required"
      });
    }

    const oldUser = await User.getOne(email);

    if (oldUser) {
      return res.status(409).send({
        message: "User Already Exist. Please Login",
        status: "Exist"
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    const token = jwt.sign({ user_id: user.id, email }, config.jwtTokenKey, {
      expiresIn: "2h"
    });

    user.token = token;

    res.status(201).send({
      data: {
        ...user,
        token
      },
      status: "OK"
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  signIn,
  signUp
};
