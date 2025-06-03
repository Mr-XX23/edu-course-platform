import app from './src/app';
import { envConfig } from './config/config';

import './src/database/connection'; 
const startServer = async () => {
    const port = envConfig.portNumber;

    app.listen( port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

startServer();
