const pool = require('./pool');

async function getAllCategories(){
    const {rows} = await pool.query("SELECT * FROM categories ORDER BY id");
    return rows;
}

async function insertCategory(name, description) {
    await pool.query("INSERT INTO categories(name,description) VALUES ($1,$2)",[name,description]);
}

async function insertItem(name, description, price, quantity, category_id){
    await pool.query("INSERT INTO items(name, description, price, quantity, category_id) VALUES ($1,$2,$3,$4,$5)",
        [name, description, price, quantity, category_id]);
}

async function getItemsByCategoryId(categoryId){
    const {rows} = await pool.query("SELECT * FROM items WHERE category_id = $1",[categoryId]);
    return rows;
}

async function getItemById(itemId){
    const {rows} = await pool.query("SELECT * FROM items WHERE id =$1",[itemId]);
    return rows;
}

module.exports = {
    getAllCategories,
    getItemById,
    getItemsByCategoryId,
    insertCategory,
    insertItem
}