import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS manufacturers (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
manufacturer VARCHAR (255)
);

INSERT INTO manufacturers (manufacturer)
VALUES
('Yamaha'),
('Fender'),
('Gibson'),
('Pearl'),
('Axis'),
('Kawai');

CREATE TABLE IF NOT EXISTS categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
category VARCHAR (255)
);

INSERT INTO categories (category)
VALUES
('Orchestral'),
('Guitars'),
('Keyboards'),
('Drums');

CREATE TABLE IF NOT EXISTS instruments(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
instrument VARCHAR (255),
price INTEGER,
quantity INTEGER,
categoryId INTEGER,
manufacturerId Integer
);

INSERT INTO instruments (instrument, price, quantity, categoryId, manufacturerId)
VALUES
('Grand Piano',1000,2,3,6),
('Small Keyboard',200,5,3,1),
('Kids Guitar',150,20,2,2),
('6pc Drumset',600,7,4,4),
('Violin',300,15,1,6),
('Cello',350,8,1,2),
('Purple Guitar',100,4,2,3),
('Kids Drumset',75,12,4,5);
`;

const main = async () => {
  console.log("seeding...");
  const client = new Client({ connectionString: process.env.DB_URL });
  await client.connect();
  await client.query(SQL), await client.end();
  console.log("done");
};

main();
