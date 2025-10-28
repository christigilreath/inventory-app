import express from "express";
import {addNewCategory, renderCategory, renderCategoryForm} from "../controllers/category.js"
const categoryRouter = express.Router({mergeParams: true})

categoryRouter.get("/add", renderCategoryForm)
categoryRouter.post("/add", addNewCategory)
categoryRouter.get("/:category", renderCategory)

export default categoryRouter