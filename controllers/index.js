import { getCategories } from "../db/queries.js";

 const renderIndex = async (req, res) => {
 const categories= await getCategories()

  res.render("index", { title: "Home" ,categories});
}

export default renderIndex