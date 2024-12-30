const express = require("express")
const route = require("../Router/routes")
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", route);
app.listen(3000,()=>{
    console.log("Started");
});