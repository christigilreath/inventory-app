import {
  getInstrument,
  getCategories,
  addInstrument,
  getManufacturers,
  getCategory,
  getManufacturer,
  editInstrument,
} from "../db/queries.js";

const renderProduct = async (req, res) => {
  const productId = req.params.product;

  const [instrument] = await getInstrument(productId);

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
  let manufacturerid;
  let categoryid;
  let selectedManufacturer;
  let selectedCategory;

  if (req.params.id) {
    [{ id, instrument, quantity, price, manufacturerid, categoryid }] =
      await getInstrument(req.params.id);
    [{ manufacturer: selectedManufacturer }] = await getManufacturer(
      manufacturerid
    );
    console.log(selectedManufacturer);
    [{ category: selectedCategory }] = await getCategory(categoryid);
    console.log(selectedCategory);
  }

  let title;
  let route;
  if (instrument) {
    title = "Edit Instrument";
    route = `/product/edit/${req.params.id}`;
  } else {
    title = "Add New Instrument";
    route = "/product/add";
  }

  res.render("instrumentForm", {
    title,
    route,
    manufacturerList,
    categoryList,
    id,
    quantity,
    instrument,
    price,
    selectedManufacturer,
    selectedCategory,
  });
};

const addProduct = async (req, res) => {
  addInstrument(req.body);
  res.redirect(`/`);
};

const editProduct = async (req, res) => {
  editInstrument(req.params.id, req.body);
  res.redirect(`/product/${req.params.id}`);
};

export { renderProduct, renderInstrumentForm, addProduct, editProduct };
