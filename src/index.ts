import express, { Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import Vehicle from './Routes/vehicle';
import Maintenance from './Routes/maintenance'

const main = async () => {
    dotenv.config();


    const app = express();
    const PORT = process.env.PORT || 5000;
    const corsOptions = { credentials: true, origin: process.env.URL || '*' };


    app.use(cors(corsOptions));
    // app.use(json());
    app.use(cookieParser());
    app.use(express.json({ limit: '2mb' }));
    app.use(express.urlencoded({ extended: true }))

    // endpoint to use vehicle API
    app.use('/api/vehicle', Vehicle);

    // // endpoint to call maintenance API
    app.use('/api/maintenance', Maintenance);

    app.get('/', (req: Request, res: Response) => {
        res.status(200).json("Hello from main")
    })

    app.listen(PORT, () => {
        console.log(`Server is listening on port:${PORT}`);
    })
}

main().catch((err) => {
    console.log(err)
})