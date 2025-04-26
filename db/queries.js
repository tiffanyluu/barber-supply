const pool = require("./pool.js");

// Categories Queries
async function getAllCategories() {
  const { rows } = await pool.query("SELECT id, name FROM categories");
  return rows;
}

async function getCategory(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function createCategory(name) {
  const { rows } = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  return rows[0];
}

async function updateCategory(id, name) {
  const { rows } = await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return rows[0];
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

// Items Queries
async function getAllItems() {
  const { rows } = await pool.query(
    "SELECT items.*, categories.name AS category_name FROM items LEFT JOIN categories ON items.category_id = categories.id"
  );
  return rows;
}

async function getAllItemsOfCategory(categoryId) {
  const { rows } = await pool.query(
    "SELECT items.*, categories.name AS category_name FROM items LEFT JOIN categories ON items.category_id = categories.id WHERE categories.id = $1",
    [categoryId]
  );
  return rows;
}

async function getItem(id) {
  const { rows } = await pool.query(
    "SELECT items.*, categories.name AS category_name FROM items LEFT JOIN categories ON items.category_id = categories.id WHERE items.id = $1",
    [id]
  );
  return rows[0];
}

async function createItem(name, category_id, quantity, unit, image_url) {
  const { rows } = await pool.query(
    "INSERT INTO items (name, category_id, quantity, unit, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, category_id, quantity, unit, image_url]
  );
  return rows[0];
}

async function updateItem(id, name, category_id, quantity, unit, image_url) {
  const { rows } = await pool.query(
    "UPDATE items SET name = $1, category_id = $2, quantity = $3, unit = $4, image_url = $5 WHERE id = $6 RETURNING *",
    [name, category_id, quantity, unit, image_url, id]
  );
  return rows[0];
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function searchItems(query) {
  const result = await pool.query(
    `
    SELECT items.*, categories.name AS category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE items.name ILIKE $1 OR categories.name ILIKE $1
    `,
    [`%${query}%`]
  );
  return result.rows;
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllItems,
  getItem,
  getAllItemsOfCategory,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
};
