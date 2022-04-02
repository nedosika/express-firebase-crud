import bcrypt from "bcryptjs";
import TokenService from "./TokenService.js";
import Firestore from "./Firestore/Firestore.js";
import {COLLECTIONS} from "./Firestore/consts.js";
import UserService from "./UserService.js";
import {TOKEN_TYPES} from "../config.js";

const signIn = async (email, password) => {
    const user = await UserService.getOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
        const tokens = TokenService.generateTokens(user);

        await UserService.update({...user, token: tokens.refreshToken});

        return {user, tokens}
    }
}

const signUp = async (email, password) => {
    const candidate = await UserService.getOneByEmail(email);

    if (candidate) {
        throw new Error("User Already Exist. Please Login")
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await Firestore.add(COLLECTIONS.users, {
            email: email.toLowerCase(),
            password: encryptedPassword
        }
    );

    const tokens = TokenService.generateTokens(user);

    await UserService.update({...user, token: tokens.refreshToken});

    return {user, tokens}
}

const logOut = async (id) => {
    const user = await UserService.getOne(id);

    const updatedUser = {...user};

    delete updatedUser.token;

    return await UserService.update(updatedUser);
}

const refresh = async (token) => {
    if(!token){
        throw new Error("Token not found")
    }

    const isVerified = TokenService.validateToken({token, type: TOKEN_TYPES.refresh});
    const user = await UserService.findByToken(token);

    if (!isVerified || !user) {
        throw new Error('Token validation error')
    }

    const tokens = TokenService.generateTokens({id: user.id});

    await UserService.update({...user, token: tokens.refreshToken});

    return {user, tokens}
}

export default {
    signIn,
    signUp,
    logOut,
    refresh
}