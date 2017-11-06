const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to db server: ',err);
    }
    console.log('Connected to MongoDb server');

    //delete many
    db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
        console.log(result);
    });

    //delete one
    db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
        console.log(result);
    });

    //find one and delete
    db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
         _id: new ObjectID('59ff05b49a1fe732781b0ebb')
        }).then((result)=>{
        console.log(result);
    });

    //db.close();
});