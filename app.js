require("dotenv/config");
const path = require("node:path");
const express= require("express");
const app = express();

const categoriesRouter = require("./routes/categoriesRouter");


app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use("/",categoriesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || "Something went wrong");
});

app.listen(process.env.PORT,(err)=>{
    if(err){
        throw err;
    }
    console.log("listening");
})

