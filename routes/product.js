import express from "express";
import {renderProduct, renderInstrumentForm, addProduct} from "../controllers/product.js";

const productRouter = express.Router({mergeParams: true})

productRouter.get("/add", renderInstrumentForm)
productRouter.post("/add", addProduct)
productRouter.get("/edit/:id", renderInstrumentForm)
// productRouter.post("/edit/:id", editProduct)
productRouter.get("/:product", renderProduct)


export default productRouter