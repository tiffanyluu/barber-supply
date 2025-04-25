const { Router } = require("express");
const itemsController = require("../controllers/itemsController.js");
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/new", itemsController.showCreateItemForm);

itemsRouter.get("/category/:categoryId", itemsController.getAllItemsOfCategory);
itemsRouter.get("/:id", itemsController.getItem);

itemsRouter.post("/", itemsController.validateItem, itemsController.createItem);

itemsRouter.get("/:id/edit", itemsController.showUpdateItemForm);
itemsRouter.put(
  "/:id",
  itemsController.validateItem,
  itemsController.updateItem
);

itemsRouter.delete("/:id", itemsController.deleteItem);

module.exports = itemsRouter;
