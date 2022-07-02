require('dotenv').config();
const connectDB=require('./config/db');
const express=require("express");
const path=require("path");

const app=express();
app.use(express.static('public'));
connectDB();
//template engine
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs');
//routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));
//port connection
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})
