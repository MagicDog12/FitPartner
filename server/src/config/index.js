import dotenv from 'dotenv';

// Cambiar NODE_ENV a 'development' por defecto
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

  dbCredentials: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },

  jwtAlgorithm: process.env.JWT_ALGO,
  jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,

  api: {
    prefix: '/api',
  }
};