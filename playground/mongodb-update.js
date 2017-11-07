const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to db server: ',err);
    }
    console.log('Connected to MongoDb server');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("59ff06d78182e83b98d152ae")
    }
    ,{
        $set:{
            completed:true
        },
        $inc:{age:10}
    }
    ,{
        returnOriginal:false
    }).then((result=>{
        console.log(result);
    }))


    //db.close();
});