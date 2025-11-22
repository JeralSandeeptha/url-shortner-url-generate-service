import './config/envConfig';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from "./utils/logger";
import './config/dbConfig';

//import routes
import appRoute from "./api/routes/app.route";
import urlRoute from "./api/routes/url_generate.route";
import { envConfig } from './config/envConfig';

const app: Application = express();
const PORT = process.env.PORT || 5002;

// Middlewares
app.use(cors({
  origin: `${envConfig.BASE_URL}`, // your frontend URL
  credentials: true, // allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1', appRoute);
app.use('/api/v1/url', urlRoute);

// start application
app.listen(PORT, () => {
    console.log(`URL Generate Service is running on port ${PORT}`);
    logger.info(`URL Generate Service is running on port ${PORT}`);
});

export default app;