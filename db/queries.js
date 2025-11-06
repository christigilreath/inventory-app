import pool from "./pool.js";

const getCategories = async () => {
  const SQL = `SELECT category FROM categories`;
  const { rows } = await pool.query(SQL);
  return rows;
};
const getManufacturers = async () => {
  const { rows } = await pool.query(`SELECT manufacturer FROM manufacturers`);
  return rows;
};

const getInstrumentsInCategory = async (category) => {
  const query = `SELECT instruments.id, instruments.instrument, instruments.price,instruments.quantity, categories.category FROM instruments JOIN categories ON instruments.categoryid= categories.id WHERE categories.category = ($1)`;
  const { rows } = await pool.query(query, [category]);

  return rows;
};

const getInstrument = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM instruments where $1 = instruments.id`,
    [id]
  );
  return rows;
};
const getCategory = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM categories where $1 =categories.id`,
    [id]
  );
  return rows;
};
const getManufacturer = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM manufacturers WHERE $1 = manufacturers.id`,
    [id]
  );
  return rows;
};

const addCategory = async (categoryName) => {
  const SQL = `INSERT INTO categories (category) VALUES($1)`;

  await pool.query(SQL, [categoryName]);
};

const deleteCategoryAndItems = async (category) => {
  const { rows } = await pool.query(
    `SELECT id FROM categories where categories.category = ($1);`,
    [category]
  );
  const categoryId = rows[0].id;
  await pool.query(
    `DELETE FROM instruments WHERE instruments.categoryId = ($1)`,
    [categoryId]
  );
  await pool.query(`DELETE FROM categories WHERE categories.category = ($1)`, [
    category,
  ]);
};

const addInstrument = async ({
  instrument,
  quantity,
  price,
  manufacturer,
  category,
}) => {
  const {
    rows: [{ id: manufacturerId }],
  } = await pool.query(
    `SELECT id FROM manufacturers WHERE manufacturers.manufacturer = ($1)`,
    [manufacturer]
  );
  const {
    rows: [{ id: categoryId }],
  } = await pool.query(
    `SELECT id FROM categories WHERE categories.category= ($1)`,
    [category]
  );

  await pool.query(
    `INSERT INTO instruments (instrument, price, quantity, categoryid, manufacturerid) VALUES($1,$2,$3,$4,$5)`,
    [
      instrument,
      price,
      quantity,
      parseInt(categoryId),
      parseInt(manufacturerId),
    ]
  );
};

const editInstrument = async (id, inputValues) => {
  const { instrument, price, quantity, manufacturer, category } = inputValues;
  const {
    rows: [{ id: manufacturerId }],
  } = await pool.query(
    `SELECT id FROM manufacturers WHERE manufacturers.manufacturer = ($1);`,
    [manufacturer]
  );
  const {
    rows: [{ id: categoryId }],
  } = await pool.query(
    `SELECT id FROM categories WHERE categories.category= ($1);`,
    [category]
  );

  await pool.query(
    `UPDATE instruments
    SET instrument= $1, price=$2, quantity=$3, manufacturerid= $4, categoryid=$5
    WHERE id=$6;`,
    [
      instrument,
      price,
      quantity,
      parseInt(manufacturerId),
      parseInt(categoryId),
      id,
    ]
  );
};

const deleteInstrument = async(id)=>{
  await pool.query(`DELETE FROM instruments WHERE instruments.id=$1`,[id])
}
export {
  getCategories,
  getManufacturers,
  getInstrumentsInCategory,
  getInstrument,
  addCategory,
  deleteCategoryAndItems,
  addInstrument,
  getCategory,
  getManufacturer,
  editInstrument,
  deleteInstrument
};
