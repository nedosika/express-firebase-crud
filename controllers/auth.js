import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

import config from "../config.js";

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({
        message: "All input is required",
        status: "Required"
      });
    }

    const user = await User.getOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user.id }, config.jwtTokenKey, {
        expiresIn: "20s"
      });

      await User.update({ ...user, token });

      return res.status(200).json({
        data: {
          token,
          user
        },
        status: "OK"
      });
    }

    res.status(400).json({
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

    const candidate = await User.getOneByEmail(email);

    if (candidate) {
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

    const token = jwt.sign({ user_id: user.id }, config.jwtTokenKey, {
      expiresIn: "20s"
    });

    await User.update({ ...user, token });

    res.status(201).send({
      data: {
        token,
        user
      },
      status: "OK"
    });
  } catch (err) {
    console.log(err);
  }
};

const refresh = async (req, res) => {
  try {
    const { user_id } = req.user;

    const newToken = jwt.sign({ user_id }, config.jwtTokenKey, {
      expiresIn: "20s"
    });

    const user = await User.getOne(user_id);

    await User.update({ ...user, token: newToken });

    return res.status(200).json({
      data: {
        token: newToken,
        user
      },
      status: "OK"
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid Credentials",
      status: "Invalid"
    });
    console.log(err.message);
  }
};

export default {
  refresh,
  signIn,
  signUp
};
