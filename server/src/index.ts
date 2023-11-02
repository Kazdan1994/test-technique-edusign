import express, { Application } from "express";
import cors, { CorsOptions } from "cors";

const app: Application = express();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const corsOptions: CorsOptions = {
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
    .listen(PORT, "localhost", function () {
        console.log(`Server is running on port ${PORT}.`);

        app.route('/')
            .get((req: any, res) => { 

                res.json({ homeText: "My super home text" });
            });


    })
    .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });