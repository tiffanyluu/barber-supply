const { Router } = require("express");
const itemsController = require("../controllers/itemsController.js");
const itemsRouter = Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/new", itemsController.showCreateItemForm);
itemsRouter.get("/search", itemsController.searchItems);

itemsRouter.get("/category/:categoryId", itemsController.getAllItemsOfCategory);
itemsRouter.get("/:id", itemsController.getItem);

itemsRouter.post(
  "/",
  upload.single("image"),
  itemsController.validateItem,
  itemsController.createItem
);

itemsRouter.get("/:id/edit", itemsController.showUpdateItemForm);
itemsRouter.put(
  "/:id",
  upload.single("image"),
  itemsController.validateItem,
  itemsController.updateItem
);

itemsRouter.delete("/:id", itemsController.deleteItem);

module.exports = itemsRouter;
