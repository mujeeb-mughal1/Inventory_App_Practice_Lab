const db = require("../models/queries");

async function getCategories(req,res) {

    const categories = await db.getAllCategories() || "none";

    res.render("index",{title:'Categories',categories:categories});

}

async function getNewItemForm(req,res) {
    const categories = await db.getAllCategories();  

    res.render("newItem", { categories })
}

async function getCategoryItems(req,res,next) {
  try {
    const categoryId = Number(req.params.id);
    const categories = await db.getAllCategories();
    const category = categories.find(category => categoryId === category.id);
    const items = await db.getItemsByCategoryId(categoryId);
    res.render("category",{title:category.name,items:items})
    
  } catch (error) {
        next(error)
  }  

}

async function getNewCategoryForm(req, res) {
    res.render("newCategory");
}

async function newCategory(req,res,next) {
    try {
          const name = req.body.name?.trim();
          const description = req.body.description?.trim() || null;
   
            await db.insertCategory(name,description);
            res.redirect("/")
        
    } catch (error) {
        next(error)
    }
  
}
async function newItem(req,res,next) {
    try {
        const name = req.body.name?.trim();
        const description = req.body.description?.trim();
        const price = req.body.price?.trim(); 
        const quantity = req.body.quantity?.trim();
        const category_id = req.body.category_id?.trim();

        await db.insertItem(name,description,price,quantity,category_id);
        res.redirect(`/categories/${category_id}`)   
    }catch(error){
        next(error)
    }
    
}
module.exports = {
    getCategories,
    getCategoryItems,
    newCategory,
    getNewCategoryForm,
    getNewItemForm,
    newItem
}