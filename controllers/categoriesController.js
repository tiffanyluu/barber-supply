const db = require("../db/queries.js");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", {
    title: "Categories",
    categories,
  });
}

async function getCategory(req, res) {
  const { id } = req.params;
  const category = await db.getCategory(id);
  const items = await db.getAllItemsOfCategory(id);
  res.render("category", {
    title: category.name,
    category,
    items,
  });
}

async function showCreateCategoryForm(req, res) {
  res.render("createCategory", {
    title: "Create Category",
  });
}

async function createCategory(req, res) {
  const { name } = req.body;
  await db.createCategory(name);
  res.redirect("/categories");
}

async function showUpdateCategoryForm(req, res) {
  const { id } = req.params;
  const category = await db.getCategory(id);
  res.render("updateCategory", {
    title: "Update Category",
    category,
  });
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  await db.updateCategory(id, name);
  res.redirect(`/categories/${id}`);
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  await db.deleteCategory(id);
  res.redirect("/categories");
}

module.exports = {
  showCreateCategoryForm,
  createCategory,
  showUpdateCategoryForm,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
};
