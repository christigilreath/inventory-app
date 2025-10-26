import { getInstrumentsInCategory } from "../db/queries.js";

const renderCategory = async (req, res) => {
  const category = req.params.category;

  const instruments = await getInstrumentsInCategory(category);
  res.render("categoryPage", { title: category, instruments });
  console.log(instruments)
};

export default renderCategory;
