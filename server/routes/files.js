const router=require('express').Router();
const mongoose =require("mongoose");
const { response } = require('express');
const multer=require('multer');
const path=require('path');
const File=require('../models/file');
const {v4:uuid4}=require('uuid');




let storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        //generate unique file name
        const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        //example->123456789.jpg
        cb(null,uniqueName);
    }
})


let upload=multer({
    storage:storage,
    limit:{
        fileSize:1000000*10
    }
}).single('myfile');//name attribute from frontend
router.post('/',(req,res)=>{
    //store in a folder
    upload(req,res,async (err)=>{
        if(!req.file){
            //validate request
            return res.json({error:'All fields are required'});
        }
        if(err){
            return res.status(500).send({err:err.message});
        }
        const file=new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
        });
        const resp=await  file.save();
    return res.json({file:`${process.env.APP_BASE_URL}/files/${resp.uuid}`})
    
    });
});

module.exports=router;