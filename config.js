import dotenv from "dotenv";

dotenv.config();

const { PORT, HOST, HOST_URL, JWT_TOKEN_KEY, SESSION_KEY } = process.env;

export default {
  port: PORT,
  jwtTokenKey: JWT_TOKEN_KEY,
  host: HOST,
  url: HOST_URL,
  sessionKey: SESSION_KEY
};
