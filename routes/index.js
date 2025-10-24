import express from "express";
import renderIndex from "../controllers/index.js";

const indexRouter = express.Router();
indexRouter.get("/", renderIndex);

export default indexRouter;
