import express from "express";
import "dotenv/config";
import cors from "cors";
import carbonRouter from "../routers/router.js";


const app = express();
const PORT = process.env.PORT;
app.use(cors({
    origin : ["http://localhost:5173"],
}));

app.use(express.json());
app.use(carbonRouter);



app.listen(PORT , () => {
    console.log(`Listening on Port : ${PORT}`);
})
