const { Router } = require("express");
const itemsController = require("../controllers/itemsController.js");
const itemsRouter = Router();

// Read Routes
itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/category/:categoryId", itemsController.getAllItemsOfCategory);
itemsRouter.get("/:id", itemsController.getItem);

// Create Routes
itemsRouter.get("/new", itemsController.showCreateItemForm);
itemsRouter.post("/", itemsController.createItem);

// Update Routes
itemsRouter.get("/:id/edit", itemsController.showUpdateItemForm);
itemsRouter.put("/:id", itemsController.updateItem);

// Delete Route
itemsRouter.delete("/:id", itemsController.deleteItem);

module.exports = itemsRouter;
