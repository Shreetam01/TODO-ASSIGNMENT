import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDatabase from "./data/database.js";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cors from "cors";

const app = express();

config({
    path: "./data/config.env",
});

app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
}));


app.use(userRouter);
app.use(taskRouter);

app.get("/", (request, response) => {
    response.send("Nicely Working");
})

connectDatabase();

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server is working on ${process.env.PORT_NUMBER}`);
});
