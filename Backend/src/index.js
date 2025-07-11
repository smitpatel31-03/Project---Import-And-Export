import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Server Error:", error);
        });
        app.listen(process.env.PORT || 4000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 4000}`);
        });
    })
    .catch((error) => {
        console.log("MONGO DB CONNECTION FAILED!!", error);
    });