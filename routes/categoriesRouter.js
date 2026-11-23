const {Router} = require("express");
const categoriesRouter = Router();

const categoriesController = require("../controllers/getCategoriesController");

categoriesRouter.get("/", categoriesController.getCategories);
categoriesRouter.get("/categories/new", categoriesController.getNewCategoryForm);
categoriesRouter.get("/items/new", categoriesController.getNewItemForm);
categoriesRouter.post("/items", categoriesController.newItem);
categoriesRouter.post("/categories", categoriesController.newCategory);
categoriesRouter.get("/categories/:id", categoriesController.getCategoryItems);



module.exports = categoriesRouter;
