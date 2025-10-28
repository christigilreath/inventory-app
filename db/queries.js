import pool from "./pool.js";

const getCategories = async ()=>{
  const SQL = `SELECT category FROM categories`
  const {rows} = await pool.query(SQL)
  return rows
}

const getInstrumentsInCategory = async (category) => {
  const allowedTables = ["Orchestral", "Guitars", "Keyboards", "Drums"];
  if (allowedTables.includes(category)) {
    const query = `SELECT instruments.id, instruments.instrument, instruments.price, categories.category FROM instruments JOIN categories ON instruments.categoryid= categories.id WHERE categories.category = '${category}'`;
    const { rows } = await pool.query(query);

    return rows;
  }
};

const getInstrument = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM instruments where $1 = instruments.id`,
    [id]
  );
  return rows;
};

const addCategory = async (categoryName)=>{
 const SQL = `INSERT INTO categories (category) VALUES($1)`
 
  await pool.query(SQL,[categoryName])
  console.log(`${categoryName} added`)
}

export { getCategories, getInstrumentsInCategory, getInstrument, addCategory };
