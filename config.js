import dotenv from "dotenv";

dotenv.config();

export const TOKEN_TYPES = {
  access: 'jwtTokenAccessKey',
  refresh: 'jwtTokenRefreshKey'
}

const { PORT, HOST, HOST_URL, JWT_ACCESS_KEY, JWT_REFRESH_KEY } = process.env;

export default {
  port: PORT,
  [TOKEN_TYPES.access]: JWT_ACCESS_KEY,
  [TOKEN_TYPES.refresh]: JWT_REFRESH_KEY,
  host: HOST,
  url: HOST_URL
};
