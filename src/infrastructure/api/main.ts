import express from "express";
import morgan from "morgan";
import { createBaseRouter } from "./baseRouter";
import { createBeerRouter } from "./beerRouter";
import { json } from "body-parser";

const application = express();

application.use(morgan("dev"));

application.use(json());

application.use("/", createBaseRouter());
application.use("/beers", createBeerRouter());

application.listen(3000, () => console.log("[Server] Development server started"));
