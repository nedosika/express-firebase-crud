import Firestore from "./Firestore/Firestore.js";
import {COLLECTIONS} from "./Firestore/consts.js";
import _ from "lodash";

const getOne = (id) => Firestore.getDocOne(COLLECTIONS.users, id);

const findByToken = async (token) => {
    const result = await Firestore.getDocsByQuery(COLLECTIONS.users, {
        field: "token",
        rule: "==",
        value: token
    });

    return result[0];
}

const getOneByEmail = async (email) => {
    const result = await Firestore.getDocsByQuery(COLLECTIONS.users, {
        field: "email",
        rule: "==",
        value: email.toLowerCase()
    })

    return result.length ? result[0] : null
}

const update = async (updatedUser) => {
    const oldUser = await getOne(updatedUser.id);

    if (_.isEmpty(oldUser)) return;

    const newUser = {...oldUser, ...updatedUser};

    await Firestore.update(COLLECTIONS.users, newUser);

    return newUser;
}

export default {
    findByToken,
    getOneByEmail,
    getOne,
    update
}