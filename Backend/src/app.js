import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()


app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [process.env.CORS_ORIGIN_USER, process.env.CORS_ORIGIN_ADMIN];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);  // ✅ Allow only the requested origin
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN_USER);
//     res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN_ADMIN);
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())



//routes
import userRouter from "./routes/user.routs.js"
import adminRouter from "./routes/admin.routs.js"
import paypalRouter from './routes/paypal.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/paypal", paypalRouter)

export { app }
