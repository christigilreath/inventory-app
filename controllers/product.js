import { getInstrument } from "../db/queries.js";

const renderProduct = async (req, res)=>{
const productId = req.params.product

const [instrument] = await getInstrument(productId)
console.log(instrument)
res.render("productPage", {title: instrument.instrument, price: instrument.price, quantity: instrument.quantity})

}

export default renderProduct