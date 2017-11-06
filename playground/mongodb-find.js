const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to db server: ',err);
    }
    console.log('Connected to MongoDb server');

    /* //find({filtro}) devuelve un cursor.
    //toArray devuelve una promise
    db.collection('Todos').find({
        _id: new ObjectID('59ff02188321e5054017f431')
        }).toArray().then((docs)=>{
        console.log('Todos:');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fecth todos',err);
    });
 */

    /* //find({filtro}) devuelve un cursor.
    //toArray devuelve una promise
    db.collection('Todos').find().count().then((count)=>{
        console.log('Todos: ',count);
    },(err)=>{
        console.log('Unable to fetch todo',err);
    })
 */

    db.collection('Users').find({ location: 'Oviedo' }).toArray().then((count=>{
        console.log(JSON.stringify(docs, undefined, 2));
    },(err)=>{
        console.log('Unable to fecth todos', err);
    }))

    db.close();
});