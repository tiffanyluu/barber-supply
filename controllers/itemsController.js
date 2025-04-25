const db = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 20 characters.";
const numErr = "must be a non-negative whole number";
const alphaErr = "must consist of letters";

const validateItem = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${lengthErr}`),
  body("quantity").trim().isInt({ min: 1 }).withMessage(`Quantity ${numErr}`),
  body("unit")
    .trim()
    .isAlpha()
    .withMessage(`Unit ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Unit ${lengthErr}`),
];

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
  const errors = validationResult(req);
  const categories = await db.getAllCategories();

  if (!errors.isEmpty()) {
    return res.status(400).render("createItem", {
      title: "Add Item",
      categories,
      errors: errors.array(),
      item: req.body,
    });
  }

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
  const errors = validationResult(req);
  const categories = await db.getAllCategories();

  if (!errors.isEmpty()) {
    return res.status(400).render("updateItem", {
      title: "Update Item",
      item: { id, ...req.body },
      categories,
      errors: errors.array(),
    });
  }

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
  validateItem,
};
