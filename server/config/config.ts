import { config } from 'dotenv'

config();

export const envConfig = {
    portNumber : process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_CONNECTION_STRING,
    jwtSecret : process.env.JWT_SECRET,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }
}

