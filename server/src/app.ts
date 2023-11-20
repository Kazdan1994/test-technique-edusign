import express from "express";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import * as healthController from "./controllers/health";
import * as documentController from "./controllers/document";

const app = express();

// Express configuration
app.set("port", process.env.PORT || 8000);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * API routes.
 */
app.get("/api/health", healthController.getHealth);
app.post("/api/sendDocument", documentController.send);

export default app;
