import { pool } from "./database.js";

export async function fetchAvengers() {
    const res = await pool.query("SELECT * FROM avengers");
    console.log(res.rows);
    return res.rows;
}

export async function fetchAvengersByName(searchName) {
    const res = await pool.query("SELECT * FROM avengers WHERE name ILIKE $1", [`%${searchName}%`]);
    if (!res.rows || res.rows.length === 0) {
        return null;
    }
    return res.rows;
}

export async function fetchAvengerById(searchId) {
    const res = await pool.query(`SELECT * FROM avengers WHERE id=${searchId}`);
    return res;
}

