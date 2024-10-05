import express from "express";
import "dotenv/config";
import carbonRouter from "../routers/router.js";
import cors from "cors";


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(carbonRouter);

app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}));


app.listen(PORT , () => {
    console.log(`Listening on Port : ${PORT}`);
})
