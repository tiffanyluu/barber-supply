const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController.js");
const categoriesRouter = Router();

categoriesRouter.get("/new", categoriesController.showCreateCategoryForm);
categoriesRouter.post("/", categoriesController.createCategory);
categoriesRouter.get("/:id/edit", categoriesController.showUpdateCategoryForm);
categoriesRouter.put("/:id", categoriesController.updateCategory);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);
categoriesRouter.get("/:id", categoriesController.getCategory);
categoriesRouter.get("/", categoriesController.getCategories);

module.exports = categoriesRouter;
