import {
  getInstrument,
  getCategories,
  addInstrument,
  getManufacturers,
} from "../db/queries.js";

const renderProduct = async (req, res) => {
  const productId = req.params.product;

  const [instrument] = await getInstrument(productId);
  console.log(instrument);
  res.render("productPage", {
    title: instrument.instrument,
    price: instrument.price,
    quantity: instrument.quantity,
    id: instrument.id,
  });
};

const renderInstrumentForm = async (req, res) => {
  const manufacturerList = await getManufacturers();
  const categoryList = await getCategories();
  let id;
  let instrument;
  let quantity;
  let price;
  if (req.params.id){
  [{ id, instrument, quantity, price }] = await getInstrument(
    req.params.id
  );}
  let title;
  instrument ? (title = "Edit Instrument") : (title = "Add New Instrument");

  res.render("instrumentForm", {
    title,
    manufacturerList,
    categoryList,
    id,
    quantity,
    instrument,
    price,
  });
};

const addProduct = async (req, res) => {
  addInstrument(req.body);
  res.redirect(`/`);
};

export { renderProduct, renderInstrumentForm, addProduct };
