import express from "express";
import "dotenv/config.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "@exortek/express-mongo-sanitize";
import { connectToDB } from "./config/db.js";
import contactFormRouter from "./routes/contactFormRoutes.js";

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','PUT','POST','DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "default-src": ["'self'"],
            "script-src": ["'self'"],
            "style-src": ["'self'", "'unsafe-inline'"],
            "connect-src": ["'self'", process.env.FRONTEND_URL as string, "wss:"],
            "object-src": ["'none'"],
            "base-uri": ["'self'"],
            "frame-ancestors": ["'none'"],
            "upgrade-insecure-requests": []
        }
    }
}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again after some time',
    standardHeaders: true,
    legacyHeaders: false,
}));

app.use(ExpressMongoSanitize({ replaceWith: "" }));

app.use("/api/contactForm", contactFormRouter);

const initialise = async () => {
    try {
        const PORT = process.env.PORT;

        if (PORT) {
            app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
        } else {
            throw new Error("PORT not found");
        }

        const MONGO_URI = process.env.MONGO_URI;

        if (MONGO_URI) {
            await connectToDB(MONGO_URI);
        } else {
            throw new Error("MONGO URI not found");
        }
    } catch(error: unknown) {
        console.log(error);

        process.exit(1);
    }
}

initialise();