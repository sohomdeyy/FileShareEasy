require('dotenv').config();
const connectDB=require('./config/db');
const express=require("express");

const app=express();

connectDB();
//port connection
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})
