import { config } from 'dotenv'

config();


export const envConfig = {

    portNumber : process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_CONNECTION_STRING,
    jwtAccessSecret : process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret : process.env.JWT_REFRESH_SECRET,
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "",
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "",
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    clientUrl : process.env.CORS_CLIENT_ORIGIN,
    
}

