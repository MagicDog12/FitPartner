import dotenv from 'dotenv';

// Cambiar NODE_ENV a 'development' por defecto
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSW,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,

  jwtAlgorithm: process.env.ALGORITHM_TOKEN,
  jwtAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  jwtEmailTokenSecret: process.env.EMAIL_TOKEN_SECRET,
  jwtExpires: process.env.TOKEN_EXPIRES,
  jwtEmailExpires: process.env.EMAIL_TOKEN_EXPIRES,


  email: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT,

  api: {
    prefix: '/api',
  }
};