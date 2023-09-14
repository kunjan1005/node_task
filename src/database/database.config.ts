import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig = {
  todoDB: {
    username:process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    logging: false,
   
  },
};