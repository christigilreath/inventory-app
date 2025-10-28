import { getInstrumentsInCategory, addCategory } from "../db/queries.js";

const renderCategory = async (req, res) => {
  const category = req.params.category;

  const instruments = await getInstrumentsInCategory(category);
  res.render("categoryPage", { title: category, instruments });
  console.log(instruments)
};

const renderCategoryForm = async (req, res) => {
res.render("categoryForm", {title: "Add Category"})
}

const addNewCategory = async (req, res)=>{
 const categoryName = req.body.categoryName
 addCategory(categoryName)
 
  res.redirect("/")
}

export  {renderCategory, renderCategoryForm, addNewCategory};
