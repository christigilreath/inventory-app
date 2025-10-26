import express from "express";
import renderCategory from "../controllers/category.js"
const categoryRouter = express.Router({mergeParams: true})

categoryRouter.get("/", renderCategory)

export default categoryRouter