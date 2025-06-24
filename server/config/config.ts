import { config } from 'dotenv'

config();

export const envConfig = {
    portNumber : process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_CONNECTION_STRING,
    jwtSecret : process.env.JWT_SECRET
}

