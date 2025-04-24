const db = require("../db/queries.js");

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render("items", {
    title: "All items",
    items,
  });
}

async function getAllItemsOfCategory(req, res) {
  const { categoryId } = req.params;
  const items = await db.getAllItemsOfCategory(categoryId);
  res.render("items", {
    title: "Items",
    items,
  });
}

async function getItem(req, res) {
  const { id } = req.params;
  const item = await db.getItem(id);
  res.render("item", {
    title: "item",
    item,
  });
}

async function showCreateItemForm(req, res) {
  res.render("createItem", {
    title: "Create Item",
  });
}

async function createItem(req, res) {
  const { name, category_id, quantity, unit } = req.body;
  await db.createItem(name, category_id, quantity, unit);
  res.redirect("/items");
}

async function showUpdateItemForm(req, res) {
  const { id } = req.params;
  const item = await db.getItem(id);
  res.render("updateItem", {
    title: "Update Item",
    item,
  });
}

async function updateItem(req, res) {
  const { id } = req.params;
  const { name, category_id, quantity, unit } = req.body;
  await db.updateItem(id, name, category_id, quantity, unit);
  res.redirect(`/items/${id}`);
}

async function deleteItem(req, res) {
  const { id } = req.params;
  await db.deleteItem(id);
  res.redirect("/items");
}

module.exports = {
  getAllItems,
  getAllItemsOfCategory,
  getItem,
  showCreateItemForm,
  createItem,
  showUpdateItemForm,
  updateItem,
  deleteItem,
};
