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
  });
};

const renderInstrumentForm = async (req, res) => {
  const manufacturerList = await getManufacturers();
  const categoryList = await getCategories();

  res.render("instrumentForm", {
    title: "Add New Instrument",
    manufacturerList,
    categoryList,
  });
};

const addProduct = async (req, res) => {
  addInstrument(req.body);
  res.redirect(`/`);
};

export { renderProduct, renderInstrumentForm, addProduct };
