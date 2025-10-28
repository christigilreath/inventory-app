import { getCategories } from "../db/queries.js";

 const renderIndex = async (req, res) => {
 const categories= await getCategories()
 console.log(categories)
  res.render("index", { title: "Home" ,categories});
}

export default renderIndex