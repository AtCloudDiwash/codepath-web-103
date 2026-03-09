import { pool } from "./database.js";
import avengerData from "../data/avengers.js";

export async function createAvengersTable() {

  const createTableQuery = `
        DROP TABLE IF EXISTS avengers;
    
        CREATE TABLE IF NOT EXISTS avengers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL,
            favoriteFood VARCHAR(255) NOT NULL
        )
    `;

  try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 avengers table created successfully')
  } catch (err) {
    console.error('⚠️ error creating avengers table', err)
  }
}


export async function seedAvengersTable() {

  await createAvengersTable();

  avengerData.forEach((avenger) => {
    const insertQuery = {
      text: 'INSERT INTO avengers (id, name, image, description, favoriteFood) VALUES ($1, $2, $3, $4, $5)'
    }

    const values = [
      avenger.id,
      avenger.name,
      avenger.image,
      avenger.description,
      avenger.favoriteFood,
    ]


    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting avenger', err)
        return
      }

      console.log(`✅ ${avenger.name} added successfully`)
    })
  });

}

export default seedAvengersTable;

