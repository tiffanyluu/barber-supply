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
    title: "Items in Category",
    items,
  });
}

async function getItem(req, res) {
  const { id } = req.params;
  const item = await db.getItem(id);
  res.render("item", {
    title: "Item Details",
    item,
  });
}

async function showCreateItemForm(req, res) {
  const categories = await db.getAllCategories();
  res.render("createItem", {
    title: "Add Item",
    categories,
  });
}

async function createItem(req, res) {
  const { name, categoryId, quantity, unit } = req.body;
  await db.createItem(name, categoryId, quantity, unit);
  res.redirect("/items");
}

async function showUpdateItemForm(req, res) {
  const { id } = req.params;
  const item = await db.getItem(id);
  const categories = await db.getAllCategories();
  res.render("updateItem", {
    title: "Update Item",
    item,
    categories,
  });
}

async function updateItem(req, res) {
  const { id } = req.params;
  const { name, categoryId, quantity, unit } = req.body;
  await db.updateItem(id, name, categoryId, quantity, unit);
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
