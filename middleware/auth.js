import jwt from "jsonwebtoken";
import config, {TOKEN_TYPES} from "../config.js";

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Token is empty",
      status: "Invalid"
    });
  }
  try {
    const decoded = jwt.verify(token, config[TOKEN_TYPES.access]);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
      status: "Invalid"
    });
  }
  return next();
};

export default verifyToken;
