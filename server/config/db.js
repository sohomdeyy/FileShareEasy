const mongoose =require("mongoose");
function connectDB() {

    const DB=process.env.MONGO_CONNECTION_URL; 
    mongoose.connect(DB,{
        useNewUrlParser:true,
        //useCatchIndex:true,
        useUnifiedTopology:true,
        //useFindAndModify:false
    }).then(()=>{
        console.log('connection seccessful');
    }).catch((err)=>{
        console.log(err)
    });

}
module.exports=connectDB;