const express = require("express");
const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");

const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);

app.get("/", (req, res) => {
  res.redirect("/categories");
});

app.get("/error-test", (req, res) => {
  throw new Error("Simulated server failure for testing purposes.");
});

app.use((req, res, next) => {
  const NotFoundError = require("./errors/NotFoundError");
  next(new NotFoundError("The page you are looking for does not exist."));
});

app.use((err, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const title = status === 404 ? "Page Not Found" : "Something Went Wrong";
  const message = err.message || "An unexpected error occurred.";

  if (status === 404) {
    res.status(404).render("404", { title, status, message });
  } else {
    res.status(status).render("500", { title, status, message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
