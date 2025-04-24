const { Router } = require("express");
const itemsController = require("../controllers/itemsController.js");
const itemsRouter = Router();

itemsRouter.get("/new", itemsController.showCreateItemForm);
itemsRouter.post("/", itemsController.createItem);
itemsRouter.get("/:id/edit", itemsController.showUpdateItemForm);
itemsRouter.put("/:id", itemsController.updateItem);
itemsRouter.delete("/:id", itemsController.deleteItem);
itemsRouter.get("/:id", itemsController.getItem);
itemsRouter.get("/", itemsController.getAllItems);

module.exports = itemsRouter;
