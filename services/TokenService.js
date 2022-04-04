import jwt from "jsonwebtoken";
import config, {TOKEN_TYPES} from "../config.js";

const generateTokens = (payload) => {
    const accessToken = jwt.sign(
        {user_id: payload.id},
        config[TOKEN_TYPES.access],
        {expiresIn: config.accessTokenExpiresIn}
        );
    const refreshToken = jwt.sign(
        {user_id: payload.id},
        config[TOKEN_TYPES.refresh],
        {expiresIn: config.refreshTokenExpiresIn}
        );

    return {accessToken, refreshToken}
}

const validateToken = (payload) => {
    try {
        return  jwt.verify(payload.token, config[payload.type]);
    } catch (error) {
        return null
    }
}

export default {
    generateTokens,
    validateToken
}