import express from "express";
import renderProduct from "../controllers/product.js";

const productRouter = express.Router({mergeParams: true})

productRouter.get("/", renderProduct)

export default productRouter