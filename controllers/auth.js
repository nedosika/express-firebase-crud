import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

import config from "../config.js";

const signin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.getOneByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.id, email },
                config.jwtTokenKey,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(error.message);
    }
}

const signup = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.getOneByEmail(email);

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            {user_id: user.id, email},
            config.jwtTokenKey,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}

export default {
    signin,
    signup
}