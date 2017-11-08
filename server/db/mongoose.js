const mongoose=require('mongoose');

//usar promise
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{useMongoClient:true});

module.exports={
    mongoose=mongoose
};
